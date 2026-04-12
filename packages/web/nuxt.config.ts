import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  // Runtime configuration - accessible via useRuntimeConfig()
  runtimeConfig: {
    public: {
      rtcUrl: process.env.VITE_RTC_URL || '',
      stunUrl: process.env.VITE_STUN_URL || '',
      turnUrls: process.env.VITE_TURN_URLS || '',
      filterIceCandidateTypes: process.env.VITE_FILTER_ICE_CANDIDATE_TYPES || '',
    }
  },

  modules: [
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
  ],

  vite: {
    plugins: [
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      }),
    ],
    optimizeDeps: {
      include: [
        'webrtc-adapter',
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: (source: string, filename: string) => {
            if (filename.endsWith('styles.scss')) return source
            return `@use "~/assets/css/styles" as *;\n${source}`
          },
          api: 'modern-compiler',
        },
      },
    },
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.ts' },
      { code: 'de', iso: 'de-DE', name: 'Deutsch', file: 'de.ts' },
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    compilation: {
      strictMessage: false,
    },
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: false,
      redirectOn: 'root',
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'palava.tv',
      short_name: 'palava.tv',
      description: 'palava.tv is a cost-free, simple to use, secure, and open source platform for video calls',
      theme_color: '#2c5aa0',
      background_color: '#f0f0f0',
      display: 'standalone',
      icons: [
        {
          src: '/favicons/palava-favicon-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/favicons/palava-favicon-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },

  app: {
    head: {
      titleTemplate: 'palava.tv | %s',
      title: 'palava.tv',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'palava.tv is a cost-free, simple to use, secure, and open source platform for video calls' },
        { name: 'keywords', content: 'webrtc,video chat,conference,free' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-title', content: 'palava.tv' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'theme-color', content: '#2c5aa0' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/palava-favicon-16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/palava-favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicons/palava-favicon-96.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicons/palava-favicon-192.png' },
        { rel: 'apple-touch-icon', href: '/favicons/palava-favicon-120.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicons/palava-favicon-152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/palava-favicon-180.png' },
      ],
    },
  },
})
