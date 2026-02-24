import { TypedEventEmitter } from './typed-event-emitter.js'
import * as browser from './browser.js'
import type { PeerEvents, PeerStatus } from './types.js'

/** Base class representing a participant in a room */
export class Peer<E extends PeerEvents & { [K in keyof E]: unknown[] } = PeerEvents> extends TypedEventEmitter<E> {
  id: string
  status: PeerStatus
  joinTime: number
  ready = false
  error: string | null = null
  muted = false
  local = false

  constructor(id: string, status?: PeerStatus) {
    super()
    this.id = id
    this.status = status ?? {}
    this.status.user_agent ??= browser.getUserAgent()
    this.joinTime = Date.now()
  }

  /** Check whether the participant is sending audio */
  transmitsAudio(): boolean {
    return !!this.getStream()?.getAudioTracks()[0]?.enabled
  }

  /** Check whether the participant has audio tracks */
  hasAudio(): boolean {
    return !!this.getStream()?.getAudioTracks()[0]
  }

  /** Check whether the participant is sending video */
  transmitsVideo(): boolean {
    return !!this.getStream()?.getVideoTracks()[0]?.enabled
  }

  /** Check whether the participant has video tracks */
  hasVideo(): boolean {
    return !!this.getStream()?.getVideoTracks()[0]
  }

  /** Check whether the peer connection has an error */
  hasError(): boolean {
    return this.error !== null
  }

  /** Returns the error message of the peer */
  getError(): string | null {
    return this.error
  }

  /** Check whether the participant is muted */
  isMuted(): boolean {
    return this.muted
  }

  /** Check whether the peer is ready (has a stream) */
  isReady(): boolean {
    return this.ready
  }

  /** Check whether the participant is local */
  isLocal(): boolean {
    return this.local
  }

  /** Check whether the participant is remote */
  isRemote(): boolean {
    return !this.local
  }

  /** Get the stream - overridden by subclasses */
  getStream(): MediaStream | null {
    return null
  }
}
