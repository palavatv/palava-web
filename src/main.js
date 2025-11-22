import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueMeta from 'vue-meta'
import { InlineSvgPlugin } from 'vue-inline-svg'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import config from './config'
import messages from './i18nStrings'
import { detectLanguage } from './support'

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
})
Vue.use(InlineSvgPlugin)

const language = detectLanguage()
const locale = language && language.startsWith('de') ? 'de' : config.defaultLocale

const i18n = new VueI18n({
  locale,
  fallbackLocale: config.defaultLocale,
  messages,
})

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
