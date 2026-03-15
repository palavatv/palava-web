import { createI18n } from 'vue-i18n'
import en from './en'
import de from './de'
import config from '../config'
import { detectLanguage } from '../utils/support'

const language = detectLanguage()
const locale = language?.startsWith('de') ? 'de' : config.defaultLocale

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: config.defaultLocale,
  messages: { en, de },
})

export default i18n
