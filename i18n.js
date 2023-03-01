import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import loginCn from './public/locales/cn/login.json'
import loginEn from './public/locales/en/login.json'

const resources = {
  cn: {
    login: loginCn,
  },
  en: {
    login: loginEn,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'cn',
  fallbackLng: 'cn',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
