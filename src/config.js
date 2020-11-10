export default {
  env: {
    rtcUrl: process.env.VUE_APP_RTC_URL,
    stunUrl: process.env.VUE_APP_STUN_URL,
    turnUrls: process.env.VUE_APP_TURN_URLS ?
      process.env.VUE_APP_TURN_URLS.split(",") : undefined,
    filterIceCandidateTypes: process.env.VUE_APP_FILTER_ICE_CANDIDATE_TYPES ?
      process.env.VUE_APP_FILTER_ICE_CANDIDATE_TYPES.split(",") : undefined,
  },
  defaultRtcUrl: 'ws://localhost:4233',
  defaultStunUrl: 'stun:stun.palava.tv',
  defaultJoinTimeout: 3000,
  gumVideoConstraints: {
    // default to selfie camera for video calls
    facingMode: 'user',
    // "ideal" resolution requested, will scale down automatically
    width: 1280,
    height: 720,
  },
  reconnectTimeout: 1000,
  maximumPeers: 6,
  defaultLocale: 'en',
  supportedLocales: ['en', 'de'],
  peerColors: [
    'transparent', // first entry must be transparent
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
  ]
}
