import { TypedEventEmitter } from './typed-event-emitter.js'
import * as browser from './browser.js'
import { Gum } from './gum.js'
import { Room } from './room.js'
import { WebSocketChannel } from './web-socket-channel.js'
import type { SessionEvents, SessionOptions, RoomOptions } from './types.js'

/** Session is a wrapper around a concrete room, channel and userMedia */
export class Session extends TypedEventEmitter<SessionEvents> {
  roomId: string | null = null
  webSocketAddress: string | null = null
  userMedia: Gum | null = null
  room: Room | null = null
  channel: WebSocketChannel | null = null

  private roomOptions: RoomOptions = {}

  constructor(o: SessionOptions = {}) {
    super()
    this.assignOptions(o)
  }

  /** Initializes the websocket channel, retrieves user media and joins room */
  connect(o?: SessionOptions): void {
    if (o) this.assignOptions(o)
    if (!this.checkRequirements()) return

    this.createChannel()
    this.createRoom()

    if (this.userMedia!.stream) {
      this.room!.join()
    } else {
      this.userMedia!.requestStream().then(() => {
        this.room?.join()
      })
    }
  }

  /** Reconnect the session */
  reconnect(): void {
    this.emit('session_reconnect')
    this.tearDown()
    this.createChannel()
    this.createRoom()
    this.room!.join()
  }

  /** Reset channel and room */
  tearDown(resetUserMedia = false): void {
    this.room?.removeAllListeners()
    this.channel?.removeAllListeners()
    if (this.channel?.isConnected()) {
      this.room?.leave()
    }
    this.channel?.close()
    this.channel = null
    this.room?.destroy()
    this.room = null
    if (resetUserMedia && this.userMedia) {
      this.userMedia.releaseStream()
    }
  }

  /** Moves options into inner state */
  private assignOptions(o: SessionOptions): void {
    if (o.roomId) this.roomId = o.roomId
    if (o.webSocketAddress) this.webSocketAddress = o.webSocketAddress

    if (o.identity) {
      this.userMedia = o.identity.newUserMedia()
      this.roomOptions.ownStatus = o.identity.getStatus()
    }

    if (o.userMediaConfig) {
      this.userMedia = new Gum(o.userMediaConfig)
    }

    if (o.dataChannels) this.roomOptions.dataChannels = o.dataChannels
    if (o.stun) this.roomOptions.stun = o.stun
    if (o.turnUrls) this.roomOptions.turnUrls = o.turnUrls
    if (o.joinTimeout) this.roomOptions.joinTimeout = o.joinTimeout
    if (o.filterIceCandidateTypes) this.roomOptions.filterIceCandidateTypes = o.filterIceCandidateTypes
  }

  /** Checks whether the inner state of the session is valid */
  private checkRequirements(): boolean {
    if (!this.webSocketAddress) {
      this.emit('argument_error', 'no web socket address given')
      return false
    }
    if (!this.userMedia) {
      this.emit('argument_error', 'no user media given')
      return false
    }
    if (!this.roomId) {
      this.emit('argument_error', 'no room id given')
      return false
    }
    if (!this.roomOptions.stun) {
      this.emit('argument_error', 'no stun server given')
      return false
    }
    if (this.roomOptions.turnUrls && !Array.isArray(this.roomOptions.turnUrls)) {
      this.emit('argument_error', 'turnUrls must be an array')
      return false
    }
    if (!navigator.onLine) {
      this.emit('signaling_not_reachable')
      return false
    }
    const e = browser.checkForWebrtcError()
    if (e) {
      this.emit('webrtc_no_support', 'WebRTC is not supported by your browser', e)
      return false
    }
    return true
  }

  /** Get the channel of the session */
  getChannel(): WebSocketChannel | null {
    return this.channel
  }

  /** Get the UserMedia of the session */
  getUserMedia(): Gum | null {
    return this.userMedia
  }

  /** Get the room of the session */
  getRoom(): Room | null {
    return this.room
  }

  /** Build connection to websocket endpoint */
  private createChannel(): void {
    this.channel = new WebSocketChannel(this.webSocketAddress!)
    this.channel.on('open', () => this.emit('signaling_open'))
    this.channel.on('error', (t, e) => this.emit('signaling_error', t, e))
    this.channel.on('close', (e) => this.emit('signaling_close', e))
    this.channel.on('not_reachable', () => this.emit('signaling_not_reachable'))
  }

  /** Maps signals from room to session signals */
  private createRoom(): void {
    this.room = new Room(this.roomId!, this.channel!, this.userMedia!, this.roomOptions)
    this.room.on('local_stream_ready', (s) => this.emit('local_stream_ready', s))
    this.room.on('local_stream_error', (e) => this.emit('local_stream_error', e))
    this.room.on('local_stream_removed', () => this.emit('local_stream_removed'))
    this.room.on('join_error', () => {
      this.tearDown(true)
      this.emit('room_join_error', this.room)
    })
    this.room.on('joined', () => this.emit('room_joined', this.room!))
    this.room.on('left', () => this.emit('room_left', this.room!))
    this.room.on('peer_joined', (p) => this.emit('peer_joined', p))
    this.room.on('peer_offer', (p) => this.emit('peer_offer', p))
    this.room.on('peer_answer', (p) => this.emit('peer_answer', p))
    this.room.on('peer_update', (p) => this.emit('peer_update', p))
    this.room.on('peer_stream_ready', (p) => this.emit('peer_stream_ready', p))
    this.room.on('peer_stream_removed', (p) => this.emit('peer_stream_removed', p))
    this.room.on('peer_connection_pending', (p) => this.emit('peer_connection_pending', p))
    this.room.on('peer_connection_established', (p) => this.emit('peer_connection_established', p))
    this.room.on('peer_connection_failed', (p) => this.emit('peer_connection_failed', p))
    this.room.on('peer_connection_disconnected', (p) => this.emit('peer_connection_disconnected', p))
    this.room.on('peer_connection_closed', (p) => this.emit('peer_connection_closed', p))
    this.room.on('peer_left', (p) => this.emit('peer_left', p))
    this.room.on('peer_channel_ready', (p, n, c) => this.emit('peer_channel_ready', p, n, c))
    this.room.on('signaling_shutdown', (s) => this.emit('signaling_shutdown', s))
    this.room.on('signaling_error', (t, e) => this.emit('signaling_error', t, e))
  }

  /** Destroys the session */
  destroy(): void {
    this.emit('session_before_destroy')
    this.tearDown(true)
    this.emit('session_after_destroy')
  }
}
