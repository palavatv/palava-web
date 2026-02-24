import { TypedEventEmitter } from './typed-event-emitter.js'
import * as browser from './browser.js'
import { Distributor } from './distributor.js'
import { LocalPeer } from './local-peer.js'
import { RemotePeer } from './remote-peer.js'
import type { Gum } from './gum.js'
import type { WebSocketChannel } from './web-socket-channel.js'
import type { Peer } from './peer.js'
import type { RoomEvents, RoomOptions, PeerStatus, TurnCredentials } from './types.js'

/** A room connecting multiple participants */
export class Room extends TypedEventEmitter<RoomEvents> {
  id: string
  userMedia: Gum
  channel: WebSocketChannel
  peers: Record<string, Peer> = {}
  localPeer: LocalPeer | null = null
  options: Required<Pick<RoomOptions, 'joinTimeout' | 'ownStatus' | 'filterIceCandidateTypes'>> &
    Pick<RoomOptions, 'dataChannels' | 'stun' | 'turnUrls'>

  private distributor: Distributor
  private joinCheckTimeout: ReturnType<typeof setTimeout> | null = null

  constructor(
    roomId: string,
    channel: WebSocketChannel,
    userMedia: Gum,
    options: RoomOptions = {},
  ) {
    super()
    this.id = roomId
    this.userMedia = userMedia
    this.channel = channel
    this.options = {
      ...options,
      joinTimeout: options.joinTimeout ?? 1000,
      ownStatus: options.ownStatus ?? {},
      filterIceCandidateTypes: options.filterIceCandidateTypes ?? [],
    }

    this.setupUserMedia()
    this.distributor = new Distributor(this.channel)
    this.setupDistributor()
  }

  /** Bind UserMedia events to room events */
  private setupUserMedia(): void {
    this.userMedia.on('stream_ready', (stream) => this.emit('local_stream_ready', stream))
    this.userMedia.on('stream_error', (error) => this.emit('local_stream_error', error))
    this.userMedia.on('stream_released', () => this.emit('local_stream_removed'))
  }

  /** Initialize global distributor and messaging */
  private setupDistributor(): void {
    this.distributor.on('joined_room', (msg) => {
      if (this.joinCheckTimeout) clearTimeout(this.joinCheckTimeout)

      let turnCredentials: TurnCredentials | null = null
      if (msg.turn_user) {
        turnCredentials = { user: msg.turn_user, password: msg.turn_password! }
      }

      new LocalPeer(msg.own_id!, this.options.ownStatus, this)

      if (msg.peers) {
        for (const peer of msg.peers) {
          const offers = !browser.isChrome()
          new RemotePeer(peer.peer_id, peer.status, this, offers, turnCredentials)
        }
      }
      this.emit('joined')
    })

    this.distributor.on('new_peer', (msg) => {
      const offers = msg.status?.user_agent === 'chrome'
      const newPeer = new RemotePeer(msg.peer_id!, msg.status ?? {}, this, offers)
      this.emit('peer_joined', newPeer)
    })

    this.distributor.on('error', (msg) => {
      this.emit('signaling_error', 'server', msg.description)
    })

    this.distributor.on('shutdown', (msg) => {
      this.emit('signaling_shutdown', msg.seconds ?? 0)
    })
  }

  /** Join the room */
  join(status: PeerStatus = {}): void {
    this.joinCheckTimeout = setTimeout(() => {
      this.emit('join_error')
    }, this.options.joinTimeout)

    for (const key of Object.keys(status)) {
      this.options.ownStatus[key] = status[key]
    }
    this.options.ownStatus.user_agent ??= browser.getUserAgent()

    this.distributor.send({
      event: 'join_room',
      room_id: this.id,
      status: this.options.ownStatus,
    })
  }

  /** Send leave room event to server */
  leave(): void {
    if (this.channel) {
      this.distributor.send({ event: 'leave_room' })
    }
    this.emit('left')
  }

  /** Destroy - disconnect all peer connections and clear all timeouts */
  destroy(): void {
    this.getRemotePeers().forEach((peer) => {
      (peer as RemotePeer).closePeerConnection()
    })
    if (this.joinCheckTimeout) clearTimeout(this.joinCheckTimeout)
  }

  /** Find peer with the given id */
  getPeerById(id: string): Peer | undefined {
    return this.peers[id]
  }

  /** Get local peer */
  getLocalPeer(): LocalPeer | null {
    return this.localPeer
  }

  /** Get remote peers */
  getRemotePeers(): Peer[] {
    return this.getAllPeers(false)
  }

  /** Get all peers */
  getAllPeers(allowLocal = true): Peer[] {
    const peers: Peer[] = []
    for (const peer of Object.values(this.peers)) {
      if (allowLocal || !peer.local) {
        peers.push(peer)
      }
    }
    return peers
  }
}
