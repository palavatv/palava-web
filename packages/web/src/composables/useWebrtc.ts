import { browser } from '@palava/client'

export const useWebRTC = () => {
  const config = usePalavaConfig()

  const checkWebRTCSupport = (): boolean => {
    if (!import.meta.client) {
      return true // Assume true on server, will be checked on client
    }
    return !browser.checkForWebrtcError()
  }

  const attachMediaStream = (
    element: HTMLMediaElement,
    stream: MediaStream | null,
    muted = false,
  ): void => {
    if (stream) {
      if (muted) {
        element.muted = true // Chrome bug: cannot set muted via <video> attribute
      }
      element.srcObject = stream
      if (element.paused) {
        element.play().catch(() => {})
      }
    } else {
      if (element.srcObject) {
        element.pause()
      }
      element.srcObject = null
      element.muted = false
    }
  }

  function getNetworkInfo(sdp: string) {
    const res: {
      primaryIps?: Array<{ address: string; type: string }>
      candidateIps?: Array<{ address: string; type: string }>
    } = {}

    const cLines = sdp.match(/^c=IN (?:IP4|IP6) .*$/gm)
    if (cLines) {
      res.primaryIps = cLines
        .map((cLine) => cLine.match(/^c=IN (?:IP4|IP6) (.*)$/m)![1])
        .filter((un, i, que) => que.indexOf(un) === i)
        .filter((ip) => ip !== '0.0.0.0')
        .map((ip) => ({
          address: ip,
          type: ip.includes(':') ? 'IP6' : 'IP4',
        }))
    }

    const candidates = sdp.match(/^a=candidate:.+? .+? .+? .+? .+? /gm)
    if (candidates) {
      res.candidateIps = candidates
        .map((aLine) => aLine.match(/^.* (.+?) $/m)![1])
        .filter((un, i, que) => que.indexOf(un) === i)
        .filter((ip) => ip !== '0.0.0.0')
        .filter(
          (ip) =>
            !res.primaryIps?.map((pip) => pip.address).includes(ip),
        )
        .map((ip) => ({
          address: ip,
          type: ip.includes(':') ? 'IP6' : 'IP4',
        }))
    }

    return res
  }

  const getRemoteIps = (peerConnection: RTCPeerConnection | null): string[] | null => {
    if (!peerConnection?.remoteDescription?.sdp) return null

    const networkInfo = getNetworkInfo(peerConnection.remoteDescription.sdp)
    if (!networkInfo) return null

    return [
      ...(networkInfo.primaryIps?.map((ip) => ip.address) ?? []),
      ...(networkInfo.candidateIps?.map((ip) => ip.address) ?? []),
    ]
  }

  const getLocalIps = (peerConnection: RTCPeerConnection | null): string[] | null => {
    if (!peerConnection?.localDescription?.sdp) return null

    const networkInfo = getNetworkInfo(peerConnection.localDescription.sdp)
    if (!networkInfo) return null

    return [
      ...(networkInfo.primaryIps?.map((ip) => ip.address) ?? []),
      ...(networkInfo.candidateIps?.map((ip) => ip.address) ?? []),
    ]
  }

  const getRelayIps = (): string[] => {
    if (!config.env.turnUrls) return []

    return config.env.turnUrls
      .map((turnUrl) => turnUrl.match(/^(?:turn:)?(.*?)(?::\d+)?\?|$/)?.[1] ?? '')
      .filter((ip) => ip !== '')
      .filter((un, i, que) => que.indexOf(un) === i)
  }

  const getMyRelayStatus = (peerConnection: RTCPeerConnection): Promise<boolean | null> => {
    return peerConnection.getStats().then((stats) => {
      if (!stats) return null

      let selectedLocalCandidate: string | undefined
      for (const report of stats.values()) {
        const { type, state, localCandidateId } = report as {
          type: string
          state?: string
          localCandidateId?: string
        }

        if (
          type === 'candidate-pair' &&
          state === 'succeeded' &&
          localCandidateId
        ) {
          selectedLocalCandidate = localCandidateId
          break
        }
      }

      return (
        !!selectedLocalCandidate &&
        (stats.get(selectedLocalCandidate) as { candidateType?: string } | undefined)?.candidateType === 'relay'
      )
    })
  }

  return {
    attachMediaStream,
    checkWebRTCSupport,
    getRemoteIps,
    getLocalIps,
    getRelayIps,
    getMyRelayStatus,
  }
}
