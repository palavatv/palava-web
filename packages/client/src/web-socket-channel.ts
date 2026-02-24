import { TypedEventEmitter } from './typed-event-emitter.js'
import type { WebSocketChannelEvents, SignalingMessage } from './types.js'

export class WebSocketChannel extends TypedEventEmitter<WebSocketChannelEvents> {
  private address: string
  private retries: number
  private socket!: WebSocket
  private messagesToDeliverOnConnect: string[] = []
  private pingInterval: ReturnType<typeof setInterval> | null = null
  private outstandingPongs = 0

  constructor(address: string, retries = 2) {
    super()
    this.address = address
    this.retries = retries
    this.setupWebsocket()
    this.startClientPings()
  }

  /** Returns true if socket is in a good state */
  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN
  }

  private sendDeliverOnConnectMessages(): void {
    for (const msg of this.messagesToDeliverOnConnect) {
      this.socket.send(msg)
    }
    this.messagesToDeliverOnConnect = []
  }

  private setupWebsocket(): void {
    this.socket = new WebSocket(this.address)

    this.socket.onopen = (handshake) => {
      this.retries = 0
      this.sendDeliverOnConnectMessages()
      this.emit('open', handshake)
    }

    this.socket.onmessage = (msg) => {
      let parsedMsg: SignalingMessage
      try {
        parsedMsg = JSON.parse(msg.data as string)
      } catch (error) {
        this.emit('error', 'invalid_format', error)
        return
      }

      if (parsedMsg.event === 'pong') {
        this.outstandingPongs = 0
      } else {
        this.emit('message', parsedMsg)
      }
    }

    this.socket.onerror = () => {
      if (this.pingInterval) clearInterval(this.pingInterval)
      if (this.retries > 0) {
        this.retries -= 1
        this.setupWebsocket()
        this.startClientPings()
      } else {
        this.emit('error', 'socket')
      }
    }

    this.socket.onclose = () => {
      if (this.pingInterval) clearInterval(this.pingInterval)
      this.emit('close')
    }
  }

  private startClientPings(): void {
    this.outstandingPongs = 0
    this.pingInterval = setInterval(() => {
      if (this.outstandingPongs >= 6) {
        if (this.pingInterval) clearInterval(this.pingInterval)
        this.socket.close()
        this.emit('error', 'missing_pongs')
        return
      }
      this.socket.send(JSON.stringify({ event: 'ping' }))
      this.outstandingPongs += 1
    }, 5000)
  }

  /** Sends the given data through the websocket */
  send(data: SignalingMessage): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      if (this.messagesToDeliverOnConnect.length !== 0) {
        this.sendDeliverOnConnectMessages()
      }
      this.socket.send(JSON.stringify(data))
    } else if (this.socket.readyState > WebSocket.OPEN) {
      // connection closing or closed
      this.emit('not_reachable')
    } else {
      // connection still to be established
      this.messagesToDeliverOnConnect.push(JSON.stringify(data))
    }
  }

  /** Closes the websocket */
  close(): void {
    if (this.pingInterval) clearInterval(this.pingInterval)
    this.socket.close()
  }
}
