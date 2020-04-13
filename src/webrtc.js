import { browser } from 'palava-client'

export function browserCanUseWebrtc() {
  return !browser.checkForWebrtcError()
}
