import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueMeta from 'vue-meta'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import config from './config'
import messages from './i18nStrings'

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
})

const i18n = new VueI18n({
  locale: config.defaultLocale,
  fallbackLocale: config.defaultLocale,
  messages,
})

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
