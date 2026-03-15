import { Gum } from './gum.js'
import type { PeerStatus } from './types.js'

export interface IdentityOptions {
  userMediaConfig?: MediaStreamConstraints
  status?: PeerStatus
  name?: string
}

export class Identity {
  userMediaConfig: MediaStreamConstraints | undefined
  status: PeerStatus

  constructor(o: IdentityOptions) {
    this.userMediaConfig = o.userMediaConfig
    this.status = o.status ?? {}
    if (o.name) {
      this.status.name = o.name
    }
  }

  newUserMedia(): Gum {
    return new Gum(this.userMediaConfig)
  }

  getName(): string | undefined {
    return this.status.name
  }

  getStatus(): PeerStatus {
    return this.status
  }
}
