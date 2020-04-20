export default {
  env: {
    rtcUrl: process.env.VUE_APP_RTC_URL,
    stunUrl: process.env.VUE_APP_STUN_URL,
  },
  defaultRtcUrl: 'wss://machine.palava.tv',
  defaultStunUrl: 'stun:stun.palava.tv',
  defaultJoinTimeout: 500,
  defaultLocale: 'en',
  supportedLocales: ['en', 'de'],
}
