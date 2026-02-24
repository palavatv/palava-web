import { Peer } from './peer.js'
import { Distributor } from './distributor.js'
import { DataChannel } from './data-channel.js'
import * as browser from './browser.js'
import type { Room } from './room.js'
import type { RemotePeerEvents, PeerStatus, TurnCredentials } from './types.js'

/** A remote participant in a room */
export class RemotePeer extends Peer<RemotePeerEvents> {
  override readonly local = false

  room: Room
  peerConnection: RTCPeerConnection | null = null
  distributor!: Distributor
  dataChannels: Record<string, DataChannel> = {}

  private remoteStream: MediaStream | null = null
  private turnCredentials: TurnCredentials | null
  private hasOfferPriority: boolean
  private negotiationQueue: Promise<void> = Promise.resolve()

  // local peer event handlers – stored for cleanup
  private localPeerVideoAddedHandler: ((track: MediaStreamTrack, stream: MediaStream) => void) | null = null
  private localPeerAudioAddedHandler: ((track: MediaStreamTrack, stream: MediaStream) => void) | null = null
  private localPeerVideoRemovedHandler: ((track: MediaStreamTrack, stream: MediaStream) => void) | null = null
  private localPeerAudioRemovedHandler: ((track: MediaStreamTrack, stream: MediaStream) => void) | null = null

  constructor(
    id: string,
    status: PeerStatus,
    room: Room,
    hasOfferPriority: boolean,
    turnCredentials?: TurnCredentials | null,
  ) {
    super(id, status)
    this.muted = false
    this.room = room
    this.turnCredentials = turnCredentials ?? null
    this.hasOfferPriority = hasOfferPriority

    this.setupRoom()
    this.setupPeerConnection()
    this.setupDistributor()

    if (this.hasOfferPriority) {
      this.queueNegotiation(() => this.createAndSendOffer())
    }
  }

  /** Get the stream */
  override getStream(): MediaStream | null {
    return this.remoteStream
  }

  /** Toggle the mute state of the peer */
  toggleMute(): void {
    this.muted = !this.muted
  }

  /** Generates the STUN and TURN options for a peer connection */
  private generateIceOptions(): RTCConfiguration {
    const iceServers: RTCIceServer[] = []

    if (this.room.options.stun) {
      iceServers.push({ urls: [this.room.options.stun] })
    }
    if (this.room.options.turnUrls && this.turnCredentials) {
      iceServers.push({
        urls: this.room.options.turnUrls,
        username: this.turnCredentials.user,
        credential: this.turnCredentials.password,
      })
    }

    return { iceServers }
  }

  /** Sets up the peer connection and its events */
  private setupPeerConnection(): void {
    this.peerConnection = new RTCPeerConnection(this.generateIceOptions())

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.distributor.send({
          event: 'ice_candidate',
          sdpmlineindex: event.candidate.sdpMLineIndex ?? undefined,
          sdpmid: event.candidate.sdpMid,
          candidate: event.candidate.candidate,
        })
      }
    }

    this.peerConnection.ontrack = (event) => {
      const stream = event.streams[0]
      const track = event.track

      if (!this.remoteStream && stream) {
        this.remoteStream = stream
        this.ready = true
        this.emit('stream_ready')

        this.remoteStream.onaddtrack = (e) => {
          if (e.track.kind === 'video') {
            this.emit('video_added', e.track, this.remoteStream!)
          } else if (e.track.kind === 'audio') {
            this.emit('audio_added', e.track, this.remoteStream!)
          }
        }

        this.remoteStream.onremovetrack = (e) => {
          if (e.track.kind === 'video') {
            this.emit('video_removed', e.track, this.remoteStream!)
          } else if (e.track.kind === 'audio') {
            this.emit('audio_removed', e.track, this.remoteStream!)
          }
        }
      } else if (track) {
        if (track.kind === 'video') {
          this.emit('video_added', track, this.remoteStream!)
        } else if (track.kind === 'audio') {
          this.emit('audio_added', track, this.remoteStream!)
        }
      }
    }

    this.peerConnection.oniceconnectionstatechange = (event) => {
      const connectionState = (event.target as RTCPeerConnection).iceConnectionState

      switch (connectionState) {
        case 'checking':
          this.error = null
          this.emit('connection_pending')
          break
        case 'connected':
          this.error = null
          this.emit('connection_established')
          break
        case 'failed':
          this.error = 'connection_failed'
          this.emit('connection_failed')
          break
        case 'disconnected':
          this.error = 'connection_disconnected'
          this.emit('connection_disconnected')
          break
        case 'closed':
          this.error = 'connection_closed'
          this.emit('connection_closed')
          break
      }
    }

    // Handle negotiationneeded event
    this.peerConnection.onnegotiationneeded = () => {
      this.queueNegotiation(() => this.createAndSendOffer())
    }

    // Add local tracks if we have a stream
    const localStream = this.room.localPeer?.getStream()
    if (localStream) {
      for (const track of localStream.getTracks()) {
        this.peerConnection.addTrack(track, localStream)
      }
    }

    // Data channel setup
    if (this.room.options.dataChannels) {
      const registerChannel = (channel: RTCDataChannel) => {
        const name = channel.label
        const wrapper = new DataChannel(channel)
        this.dataChannels[name] = wrapper
        this.emit('channel_ready', name, wrapper)
      }

      if (this.hasOfferPriority) {
        for (const [label, options] of Object.entries(this.room.options.dataChannels)) {
          const channel = this.peerConnection.createDataChannel(label, options)
          channel.onopen = function (this: RTCDataChannel) {
            registerChannel(this)
          }
        }
      } else {
        this.peerConnection.ondatachannel = (event) => {
          registerChannel(event.channel)
        }
      }
    }
  }

  /** Queues a negotiation task to ensure sequential execution */
  private queueNegotiation(task: () => Promise<void>): void {
    this.negotiationQueue = this.negotiationQueue
      .then(task)
      .catch((error) => {
        this.emit('oaerror', error)
      })
  }

  /** Creates and sends an offer */
  private createAndSendOffer(): Promise<void> {
    if (!this.peerConnection) return Promise.resolve()

    return this.peerConnection
      .createOffer(browser.getOfferOptions())
      .then((offer) => this.peerConnection!.setLocalDescription(offer))
      .then(() => {
        this.distributor.send({
          event: 'offer',
          sdp: this.peerConnection!.localDescription!.toJSON(),
        })
        this.emit('offer')
      })
  }

  /** Handles an incoming offer */
  private handleOffer(sdp: RTCSessionDescriptionInit): Promise<void> {
    if (!this.peerConnection) return Promise.resolve()

    // If we're impolite and have a pending local offer, ignore incoming offer
    if (this.hasOfferPriority && this.peerConnection.signalingState === 'have-local-offer') {
      return Promise.resolve()
    }

    return this.peerConnection
      .setRemoteDescription(sdp)
      .then(() => this.peerConnection!.createAnswer())
      .then((answer) => this.peerConnection!.setLocalDescription(answer))
      .then(() => {
        this.distributor.send({
          event: 'answer',
          sdp: this.peerConnection!.localDescription!.toJSON(),
        })
        this.emit('answer')
      })
  }

  /** Handles an incoming answer */
  private handleAnswer(sdp: RTCSessionDescriptionInit): Promise<void> {
    if (!this.peerConnection) return Promise.resolve()

    // Only process answer if we're expecting one
    if (this.peerConnection.signalingState !== 'have-local-offer') {
      return Promise.resolve()
    }

    return this.peerConnection.setRemoteDescription(sdp)
  }

  /** Adds a new track to this peer connection */
  addTrack(track: MediaStreamTrack, stream: MediaStream): void {
    if (!this.peerConnection) return
    this.peerConnection.addTrack(track, stream)
  }

  /** Removes a track from this peer connection */
  removeTrack(track: MediaStreamTrack): void {
    if (!this.peerConnection) return
    const sender = this.peerConnection.getSenders().find((s) => s.track === track)
    if (sender) {
      this.peerConnection.removeTrack(sender)
    }
  }

  /** Sets up the distributor connecting to the participant */
  private setupDistributor(): void {
    this.distributor = new Distributor(this.room.channel, this.id)

    this.distributor.on('peer_left', () => {
      if (this.ready) {
        this.remoteStream = null
        this.emit('stream_removed')
        this.ready = false
      }
      this.peerConnection?.close()
      this.emit('left')
    })

    this.distributor.on('ice_candidate', (msg) => {
      if (msg.candidate === '') return
      const candidate = new RTCIceCandidate({
        candidate: msg.candidate,
        sdpMLineIndex: msg.sdpmlineindex,
        sdpMid: msg.sdpmid,
      })
      if (!this.room.options.filterIceCandidateTypes?.includes(candidate.type ?? '')) {
        this.peerConnection?.addIceCandidate(candidate)
      }
    })

    this.distributor.on('offer', (msg) => {
      if (!msg.sdp) return
      const sdp = msg.sdp as RTCSessionDescriptionInit
      this.queueNegotiation(() => this.handleOffer(sdp))
    })

    this.distributor.on('answer', (msg) => {
      if (!msg.sdp) return
      const sdp = msg.sdp as RTCSessionDescriptionInit
      this.queueNegotiation(() => this.handleAnswer(sdp))
    })

    this.distributor.on('peer_updated_status', (msg) => {
      if (msg.status) {
        this.status = msg.status
      }
      this.emit('update')
    })

    this.distributor.on('message', (msg) => {
      this.emit('message', msg.data)
    })
  }

  /** Forward events to the room and listen for local peer events */
  private setupRoom(): void {
    this.room.peers[this.id] = this

    this.on('left', () => {
      delete this.room.peers[this.id]
      this.room.emit('peer_left', this)
    })
    this.on('offer', () => this.room.emit('peer_offer', this))
    this.on('answer', () => this.room.emit('peer_answer', this))
    this.on('update', () => this.room.emit('peer_update', this))
    this.on('stream_ready', () => this.room.emit('peer_stream_ready', this))
    this.on('stream_removed', () => this.room.emit('peer_stream_removed', this))
    this.on('connection_pending', () => this.room.emit('peer_connection_pending', this))
    this.on('connection_established', () => this.room.emit('peer_connection_established', this))
    this.on('connection_failed', () => this.room.emit('peer_connection_failed', this))
    this.on('connection_disconnected', () => this.room.emit('peer_connection_disconnected', this))
    this.on('connection_closed', () => this.room.emit('peer_connection_closed', this))
    this.on('oaerror', (e) => this.room.emit('peer_oaerror', this, e))
    this.on('channel_ready', (n, c) => this.room.emit('peer_channel_ready', this, n, c))

    this.setupLocalPeerListeners()
  }

  /** Listen for video/audio added/removed events from the local peer */
  private setupLocalPeerListeners(): void {
    this.localPeerVideoAddedHandler = (track, stream) => {
      this.addTrack(track, stream)
    }
    this.localPeerAudioAddedHandler = (track, stream) => {
      this.addTrack(track, stream)
    }
    this.localPeerVideoRemovedHandler = (_track) => {
      this.removeTrack(_track)
    }
    this.localPeerAudioRemovedHandler = (_track) => {
      this.removeTrack(_track)
    }

    if (this.room.localPeer) {
      this.room.localPeer.on('video_added', this.localPeerVideoAddedHandler)
      this.room.localPeer.on('audio_added', this.localPeerAudioAddedHandler)
      this.room.localPeer.on('video_removed', this.localPeerVideoRemovedHandler)
      this.room.localPeer.on('audio_removed', this.localPeerAudioRemovedHandler)
    }

    // Clean up listeners when this peer leaves
    this.on('left', () => {
      if (this.room.localPeer && this.localPeerVideoAddedHandler) {
        this.room.localPeer.off('video_added', this.localPeerVideoAddedHandler)
        this.room.localPeer.off('audio_added', this.localPeerAudioAddedHandler!)
        this.room.localPeer.off('video_removed', this.localPeerVideoRemovedHandler!)
        this.room.localPeer.off('audio_removed', this.localPeerAudioRemovedHandler!)
      }
    })
  }

  /** Send a message to this remote peer */
  sendMessage(data: unknown): void {
    this.distributor.send({
      event: 'message',
      data,
    })
  }

  /** End peer connection */
  closePeerConnection(): void {
    this.peerConnection?.close()
    this.peerConnection = null
  }
}
