export default {
  env: {
    rtcUrl: process.env.VUE_APP_RTC_URL,
    stunUrl: process.env.VUE_APP_STUN_URL,
  },
  defaultRtcUrl: 'ws://localhost:4233',
  defaultStunUrl: 'stun:stun.palava.tv',
  defaultJoinTimeout: 1500,
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
