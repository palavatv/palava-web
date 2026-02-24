import type { WebSocketChannel } from './web-socket-channel.js'
import type { SignalingMessage } from './types.js'

/**
 * Distributor filters incoming signaling messages and wraps outgoing ones
 * in `send_to_peer` envelopes when targeting a specific peer.
 */
export class Distributor {
  private channel: WebSocketChannel
  private peerId: string | null

  constructor(channel: WebSocketChannel, peerId: string | null = null) {
    this.channel = channel
    this.peerId = peerId
  }

  /**
   * Subscribe to an event, filtering messages by sender_id (for peer distributors)
   * or global messages (for room distributors).
   */
  on(event: string, handler: (msg: SignalingMessage) => void): void {
    this.channel.on('message', (msg) => {
      if (this.peerId) {
        if (msg.sender_id === this.peerId && event === msg.event) {
          handler(msg)
        }
      } else {
        if (!msg.sender_id && event === msg.event) {
          handler(msg)
        }
      }
    })
  }

  /** Sends a message through the Distributor */
  send(msg: SignalingMessage): void {
    if (this.peerId) {
      const payload: SignalingMessage = {
        event: 'send_to_peer',
        peer_id: this.peerId,
        data: msg,
      }
      this.channel.send(payload)
    } else {
      this.channel.send(msg)
    }
  }
}
