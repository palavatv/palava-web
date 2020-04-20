import {
  browser,
  Session,
  Identity,
  WebSocketChannel,
} from 'palava-client'

export function browserCanUseWebrtc() {
  return !browser.checkForWebrtcError()
}

export function createIdentity(userMediaConfig) {
  return new Identity({ userMediaConfig })
}

export function createSession(roomId, rtcUrl) {
  return new Session({
    roomId,
    peers: [],
    channel: new WebSocketChannel(rtcUrl),
  })
}
