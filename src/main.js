import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import InlineSvg from 'vue-inline-svg'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import config from './config'
import messages from './i18nStrings'
import { detectLanguage } from './support'

const language = detectLanguage()
// Not sure if below is working as expected?
const locale = language && language.startsWith('de') ? 'de' : config.defaultLocale

const i18n = createI18n({
  locale,
  fallbackLocale: config.defaultLocale,
  messages,
})

const app = createApp(App)

app.use(router)
  .use(i18n)
  .use(createHead())
  .component('inline-svg', InlineSvg)
  .mount('#app')
