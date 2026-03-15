/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

declare module '*.mp3' {
  const src: string
  export default src
}

interface ImportMetaEnv {
  readonly VITE_RTC_URL?: string
  readonly VITE_STUN_URL?: string
  readonly VITE_TURN_URLS?: string
  readonly VITE_FILTER_ICE_CANDIDATE_TYPES?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
