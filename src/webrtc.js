import { browser } from 'palava-client'
import config from './config'

export function browserCanUseWebrtc() {
  return !browser.checkForWebrtcError()
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

export function getRemoteIps(peerConnection) {
  if(!peerConnection) { return null }

  const networkInfo = getNetworkInfo(peerConnection.remoteDescription.sdp)
  if(!networkInfo) { return null }

  return [
    ...(networkInfo.primaryIps?.map((ip) => ip.address) || []),
    ...(networkInfo.candidateIps?.map((ip) => ip.address) || []),
  ]
}

export function getLocalIps(peerConnection) {
  if(!peerConnection) { return null }

  const networkInfo = getNetworkInfo(peerConnection.localDescription.sdp)
  if(!networkInfo) { return null }

  return [
    ...(networkInfo.primaryIps?.map((ip) => ip.address) || []),
    ...(networkInfo.candidateIps?.map((ip) => ip.address) || []),
  ]
}

export function getRelayIps() {
  if(!config.env.turnUrls) { return [] }

  return config.env.turnUrls.map(
    (turnUrl) => turnUrl.match(/^(?:turn:)?(.*?)(?::\d+)?\?|$/)[1]
  ).filter((un, i, que) => que.indexOf(un) === i)
}

export function getMyRelayStatus(peerConnection) {
  return peerConnection.getStats().then((stats) => {
    if(!stats) { return null }

    let selectedLocalCandidate
    const statsIterator = stats.values()
    for (let i = 0; i < stats.size; i += 1) {
      const report = statsIterator.next().value
      const { type, state, localCandidateId } = report

      if (type === 'candidate-pair' &&
          state === 'succeeded' &&
          localCandidateId) {
        selectedLocalCandidate = localCandidateId
        break
      }
    }

    return !!selectedLocalCandidate &&
           stats.get(selectedLocalCandidate)?.candidateType === 'relay'
  })
}
