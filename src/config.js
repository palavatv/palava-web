export default {
  env: {
    rtcUrl: process.env.VUE_APP_RTC_URL,
    stunUrl: process.env.VUE_APP_STUN_URL,
  },
  defaultRtcUrl: 'ws://localhost:4233',
  defaultStunUrl: 'stun:stun.palava.tv',
  defaultJoinTimeout: 500,
  maximumPeers: 6,
  defaultLocale: 'en',
  supportedLocales: ['en', 'de'],
}
