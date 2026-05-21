import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from './translations/en'
import heTranslations from './translations/he'

const savedLang = localStorage.getItem('cyberisrael-lang') || 'en'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      he: { translation: heTranslations },
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
