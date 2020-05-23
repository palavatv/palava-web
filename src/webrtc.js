import {
  browser,
  Session,
  Identity,
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
    web_socket_address: rtcUrl,
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
      element.play().catch(() => {})
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

  const cLines = sdp.match(/^c=IN (?:IP4|IP6) .*$/gm)
  if (cLines) {
    res.primaryIps = cLines.
      map((cLine) => cLine.match(/^c=IN (?:IP4|IP6) (.*)$/m)[1]).
      filter((un, i, que) => que.indexOf(un) === i).
      filter((ip) => ip !== "0.0.0.0").
      map((ip) => ({
        address: ip,
        type: ip.includes(':') ? 'IP6' : 'IP4',
      }))
  }

  const candidates = sdp.match(/^a=candidate:.+? .+? .+? .+? .+? /gm)
  if (candidates) {
    res.candidateIps = candidates.
      map((aLine) => aLine.match(/^.* (.+?) $/m)[1]).
      filter((un, i, que) => que.indexOf(un) === i).
      filter((ip) => ip !== "0.0.0.0").
      filter((ip) => res.primaryIps.map((pip) => pip.address).indexOf(ip) === -1).
      map((ip) => ({
        address: ip,
        type: ip.includes(':') ? 'IP6' : 'IP4',
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
