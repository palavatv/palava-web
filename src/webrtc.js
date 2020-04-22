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

export function attachMediaStream(element, stream, muted = false) {
  /* eslint-disable no-param-reassign */
  if (stream) {
    if (muted) {
      element.muted = true // Chrome bug, cannot set via <video>
    }
    element.srcObject = stream
    if (element.paused) {
      element.play()
    }
  } else {
    if (element.srcObject) { element.pause() }
    element.srcObject = null
    element.muted = false
  }
  /* eslint-enable no-param-reassign */
}
