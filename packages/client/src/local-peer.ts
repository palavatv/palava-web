import * as browser from './browser.js'
import { Peer } from './peer.js'
import type { Gum } from './gum.js'
import type { Room } from './room.js'
import type { PeerStatus } from './types.js'

/** A specialized peer representing the local user in the conference */
export class LocalPeer extends Peer {
  room: Room
  userMedia: Gum

  constructor(id: string, status: PeerStatus, room: Room) {
    super(id, status)
    this.muted = true
    this.local = true

    this.room = room
    this.userMedia = room.userMedia

    this.setupRoom()
    this.setupUserMedia()
  }

  private setupUserMedia(): void {
    this.userMedia.on('stream_released', () => {
      this.ready = false
      this.emit('stream_removed')
    })
    this.userMedia.on('stream_ready', (stream) => {
      this.ready = true
      this.emit('stream_ready', stream)
    })
    this.userMedia.on('stream_error', (e) => {
      this.emit('stream_error', e)
    })
    if (this.getStream()) {
      this.ready = true
      this.emit('stream_ready')
    }
  }

  private setupRoom(): void {
    this.room.peers[this.id] = this
    this.room.localPeer = this
    this.on('update', () => this.room.emit('peer_update', this))
    this.on('stream_ready', () => this.room.emit('peer_stream_ready', this))
    this.on('stream_removed', () => this.room.emit('peer_stream_removed', this))
  }

  /** Returns the local stream */
  override getStream(): MediaStream | null {
    return this.userMedia.getStream()
  }

  /** Updates the status of the local peer */
  updateStatus(status: PeerStatus): PeerStatus {
    if (!status || typeof status !== 'object' || Object.keys(status).length === 0) {
      return this.status
    }
    for (const key of Object.keys(status)) {
      this.status[key] = status[key]
    }
    this.status.user_agent ??= browser.getUserAgent()
    this.room.channel.send({
      event: 'update_status',
      status: this.status,
    })
    return this.status
  }

  /** Remove video track and emit event for renegotiation */
  disableVideo(): void {
    const stream = this.getStream()
    if (!stream) return
    for (const track of stream.getVideoTracks()) {
      track.stop()
      stream.removeTrack(track)
      this.emit('video_removed', track, stream)
    }
  }

  /** Remove audio track and emit event for renegotiation */
  disableAudio(): void {
    const stream = this.getStream()
    if (!stream) return
    for (const track of stream.getAudioTracks()) {
      track.stop()
      stream.removeTrack(track)
      this.emit('audio_removed', track, stream)
    }
  }

  /**
   * Request video from getUserMedia and add it to the local stream.
   * Emits 'video_added' event which remote peers listen to.
   */
  requestVideo(constraints: MediaTrackConstraints | boolean = true): Promise<MediaStreamTrack> {
    const stream = this.getStream()
    if (!stream) return Promise.reject(new Error('No stream available'))
    if (this.hasVideo()) return Promise.resolve(stream.getVideoTracks()[0]!)

    return navigator.mediaDevices
      .getUserMedia({ video: constraints, audio: false })
      .then((newStream) => {
        const videoTrack = newStream.getVideoTracks()[0]
        if (!videoTrack) return Promise.reject(new Error('No video track received'))

        stream.addTrack(videoTrack)
        this.emit('video_added', videoTrack, stream)
        return videoTrack
      })
      .catch((error) => {
        this.emit('video_error', error)
        return Promise.reject(error)
      })
  }

  /**
   * Request audio from getUserMedia and add it to the local stream.
   * Emits 'audio_added' event which remote peers listen to.
   */
  requestAudio(constraints: MediaTrackConstraints | boolean = true): Promise<MediaStreamTrack> {
    const stream = this.getStream()
    if (!stream) return Promise.reject(new Error('No stream available'))
    if (this.hasAudio()) return Promise.resolve(stream.getAudioTracks()[0]!)

    return navigator.mediaDevices
      .getUserMedia({ video: false, audio: constraints })
      .then((newStream) => {
        const audioTrack = newStream.getAudioTracks()[0]
        if (!audioTrack) return Promise.reject(new Error('No audio track received'))

        stream.addTrack(audioTrack)
        this.emit('audio_added', audioTrack, stream)
        return audioTrack
      })
      .catch((error) => {
        this.emit('audio_error', error)
        return Promise.reject(error)
      })
  }

  /** Leave the room */
  leave(): void {
    this.ready = false
    this.emit('left')
  }
}
