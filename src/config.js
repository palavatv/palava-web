export default {
  env: {
    rtcUrl: process.env.VUE_APP_RTC_URL,
    stunUrl: process.env.VUE_APP_STUN_URL,
  },
  defaultLocale: 'en',
  supportedLocales: ['en', 'de'],
}
