import { TypedEventEmitter } from './typed-event-emitter.js'
import type { GumEvents } from './types.js'

export class Gum extends TypedEventEmitter<GumEvents> {
  config: MediaStreamConstraints
  stream: MediaStream | null = null

  constructor(config?: MediaStreamConstraints) {
    super()
    this.config = config ?? { video: true, audio: true }
  }

  changeConfig(config: MediaStreamConstraints): void {
    this.config = config
    this.releaseStream()
    this.requestStream()
  }

  requestStream(): Promise<void> {
    return navigator.mediaDevices
      .getUserMedia(this.config)
      .then((stream) => {
        this.stream = stream
        this.emit('stream_ready', stream)
      })
      .catch((error) => {
        this.emit('stream_error', error)
      })
  }

  getStream(): MediaStream | null {
    return this.stream
  }

  releaseStream(): boolean {
    if (this.stream) {
      this.stream.getAudioTracks().forEach((track) => track.stop())
      this.stream.getVideoTracks().forEach((track) => track.stop())
      this.stream = null
      this.emit('stream_released', this)
      return true
    }
    return false
  }
}
