import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import VueMeta from 'vue-meta'
import { InlineSvgPlugin } from 'vue-inline-svg'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import config from './config'
import messages from './i18nStrings'
import { detectLanguage } from './support'

const language = detectLanguage()
const locale = language && language.startsWith('de') ? 'de' : config.defaultLocale

const i18n = createI18n({
  locale,
  fallbackLocale: config.defaultLocale,
  messages,
})

const app = createApp(App)
app
  .use(router)
  .use(i18n)
  .use(VueMeta, { refreshOnceOnNavigation: true, })
  .use(InlineSvgPlugin)

app.mount('#app')
