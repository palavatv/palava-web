import adapter from 'webrtc-adapter'

/** Check if the browser is Firefox */
export function isMozilla(): boolean {
  return adapter.browserDetails.browser === 'firefox'
}

/** Check if the browser is Chrome/Chromium */
export function isChrome(): boolean {
  return adapter.browserDetails.browser === 'chrome'
}

/** Get the browser user agent identifier */
export function getUserAgent(): string {
  return adapter.browserDetails.browser ?? 'unknown'
}

/** Get the browser version */
export function getUserAgentVersion(): number | null {
  return adapter.browserDetails.version ?? null
}

/**
 * Check whether the browser supports WebRTC.
 * Returns an error if not supported, or false if supported.
 */
export function checkForWebrtcError(): unknown | false {
  try {
    new RTCPeerConnection({ iceServers: [] })
  } catch (e) {
    return e
  }

  if (
    !(
      window.RTCPeerConnection &&
      window.RTCIceCandidate &&
      window.RTCSessionDescription &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    )
  ) {
    return true
  }

  return false
}

/** Get modern WebRTC offer/answer options */
export function getOfferOptions(): RTCOfferOptions {
  return {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
  }
}

/** Attach a media stream to a DOM element */
export function attachMediaStream(
  element: HTMLMediaElement,
  stream: MediaStream | null,
): void {
  if (stream) {
    element.srcObject = stream
  } else {
    element.pause()
    element.srcObject = null
  }
}
