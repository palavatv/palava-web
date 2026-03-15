export default {
  env: {
    rtcUrl: import.meta.env.VITE_RTC_URL,
    stunUrl: import.meta.env.VITE_STUN_URL,
    turnUrls: import.meta.env.VITE_TURN_URLS
      ? import.meta.env.VITE_TURN_URLS.split(',')
      : undefined,
    filterIceCandidateTypes: import.meta.env.VITE_FILTER_ICE_CANDIDATE_TYPES
      ? import.meta.env.VITE_FILTER_ICE_CANDIDATE_TYPES.split(',')
      : undefined,
  },
  defaultRtcUrl: 'ws://localhost:4233',
  defaultStunUrl: 'stun:stun.palava.tv',
  defaultJoinTimeout: 3000,
  gumVideoConstraints: {
    facingMode: 'user' as const,
    width: 1280,
    height: 720,
  },
  reconnectTimeout: 1000,
  maximumPeers: 6,
  defaultLocale: 'en' as const,
  supportedLocales: ['en', 'de'] as const,
  peerColors: [
    'transparent',
    '#ffe6c0',
    '#ffc0cb',
    '#c0dcff',
    '#caa5a5',
    '#c0d8c3',
    '#e5dcf5',
    '#989898',
    '#fffdc0',
    '#eaeaea',
    '#8ad7e8',
  ],
}
