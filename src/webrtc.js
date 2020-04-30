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

function getNetworkInfo(sdp) {
  const res = {}

  const cLine = sdp.match(/^c=IN (IP4|IP6) (.*)$/m)
  if (cLine) {
    res.ipAddress = cLine[2]
    res.ipType = cLine[1]
  }

  const candidates = sdp.match(/^a=candidate:.+? .+? .+? .+? .+? /gm)
  if (candidates) {
    res.otherIps = candidates.
      map((aLine) => aLine.match(/^.* (.+?) $/m)[1]).
      filter((un, i, que) => que.indexOf(un) === i).
      filter((ip) => ip !== res.ipAddress).
      map((ip) => ({
        ipType: ip.includes(':') ? 'IP6' : 'IP4',
        ipAddress: ip,
      }))
  }

  return res
}

export function getRemoteNetworkInfo(peerConnection) {
  return getNetworkInfo(peerConnection.remoteDescription.sdp)
}

export function getLocalNetworkInfo(peerConnection) {
  return getNetworkInfo(peerConnection.localDescription.sdp)
}
