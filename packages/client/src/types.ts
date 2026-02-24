import type { Room } from './room.js'
import type { RemotePeer } from './remote-peer.js'
import type { Peer } from './peer.js'
import type { DataChannel } from './data-channel.js'

// ── Session ──

export interface SessionOptions {
  roomId?: string
  webSocketAddress?: string
  identity?: {
    newUserMedia(): import('./gum.js').Gum
    getStatus(): PeerStatus
  }
  userMediaConfig?: MediaStreamConstraints
  dataChannels?: Record<string, RTCDataChannelInit>
  stun?: string
  turnUrls?: string[]
  joinTimeout?: number
  filterIceCandidateTypes?: string[]
}

export interface SessionEvents {
  argument_error: [message: string]
  webrtc_no_support: [message: string, error: unknown]
  signaling_open: []
  signaling_error: [type: string, error?: unknown]
  signaling_close: [event?: unknown]
  signaling_not_reachable: []
  signaling_shutdown: [seconds: number]
  local_stream_ready: [stream: MediaStream]
  local_stream_error: [error: unknown]
  local_stream_removed: []
  room_join_error: [room: Room | null]
  room_full: [room: Room | null]
  room_joined: [room: Room]
  room_left: [room: Room]
  peer_joined: [peer: RemotePeer]
  peer_offer: [peer: RemotePeer]
  peer_answer: [peer: RemotePeer]
  peer_update: [peer: Peer]
  peer_stream_ready: [peer: Peer]
  peer_stream_removed: [peer: Peer]
  peer_connection_pending: [peer: RemotePeer]
  peer_connection_established: [peer: RemotePeer]
  peer_connection_failed: [peer: RemotePeer]
  peer_connection_disconnected: [peer: RemotePeer]
  peer_connection_closed: [peer: RemotePeer]
  peer_left: [peer: RemotePeer]
  peer_channel_ready: [peer: RemotePeer, name: string, channel: DataChannel]
  session_reconnect: []
  session_before_destroy: []
  session_after_destroy: []
}

// ── Room ──

export interface RoomOptions {
  ownStatus?: PeerStatus
  dataChannels?: Record<string, RTCDataChannelInit>
  stun?: string
  turnUrls?: string[]
  joinTimeout?: number
  filterIceCandidateTypes?: string[]
}

export interface RoomEvents {
  local_stream_ready: [stream: MediaStream]
  local_stream_error: [error: unknown]
  local_stream_removed: []
  join_error: []
  full: []
  joined: []
  left: []
  peer_joined: [peer: RemotePeer]
  peer_offer: [peer: RemotePeer]
  peer_answer: [peer: RemotePeer]
  peer_update: [peer: Peer]
  peer_stream_ready: [peer: Peer]
  peer_stream_removed: [peer: Peer]
  peer_connection_pending: [peer: RemotePeer]
  peer_connection_established: [peer: RemotePeer]
  peer_connection_failed: [peer: RemotePeer]
  peer_connection_disconnected: [peer: RemotePeer]
  peer_connection_closed: [peer: RemotePeer]
  peer_left: [peer: RemotePeer]
  peer_oaerror: [peer: RemotePeer, error: unknown]
  peer_channel_ready: [peer: RemotePeer, name: string, channel: DataChannel]
  signaling_error: [type: string, description?: string]
  signaling_shutdown: [seconds: number]
}

// ── Peer ──

export interface PeerStatus {
  user_agent?: string
  name?: string
  [key: string]: unknown
}

export interface PeerEvents {
  stream_ready: [stream?: MediaStream]
  stream_removed: []
  stream_error: [error: unknown]
  update: []
  left: []
  video_added: [track: MediaStreamTrack, stream: MediaStream]
  audio_added: [track: MediaStreamTrack, stream: MediaStream]
  video_removed: [track: MediaStreamTrack, stream: MediaStream]
  audio_removed: [track: MediaStreamTrack, stream: MediaStream]
  video_error: [error: unknown]
  audio_error: [error: unknown]
}

// ── RemotePeer ──

export interface RemotePeerEvents extends PeerEvents {
  connection_pending: []
  connection_established: []
  connection_failed: []
  connection_disconnected: []
  connection_closed: []
  oaerror: [error: unknown]
  offer: []
  answer: []
  channel_ready: [name: string, channel: DataChannel]
  message: [data: unknown]
}

// ── WebSocketChannel ──

export interface WebSocketChannelEvents {
  open: [handshake?: Event]
  message: [msg: SignalingMessage]
  error: [type: string, error?: unknown]
  close: [event?: unknown]
  not_reachable: []
}

// ── Signaling Messages ──

export interface SignalingMessage {
  event: string
  sender_id?: string
  peer_id?: string
  room_id?: string
  own_id?: string
  status?: PeerStatus
  peers?: Array<{ peer_id: string; status: PeerStatus }>
  turn_user?: string
  turn_password?: string
  sdp?: RTCSessionDescriptionInit
  candidate?: string
  sdpmlineindex?: number
  sdpmid?: string | null
  data?: unknown
  description?: string
  seconds?: number
  [key: string]: unknown
}

// ── Gum ──

export interface GumEvents {
  stream_ready: [stream: MediaStream]
  stream_error: [error: unknown]
  stream_released: [gum: import('./gum.js').Gum]
}

// ── DataChannel ──

export interface DataChannelEvents {
  message: [data: unknown]
  close: []
  error: [error: Event]
}

// ── TurnCredentials ──

export interface TurnCredentials {
  user: string
  password: string
}
