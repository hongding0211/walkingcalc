import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import homeCn from './public/locales/cn/home.json'
import loginCn from './public/locales/cn/login.json'
import homeEn from './public/locales/en/home.json'
import loginEn from './public/locales/en/login.json'

const resources = {
  cn: {
    login: loginCn,
    home: homeCn,
  },
  en: {
    login: loginEn,
    home: homeEn,
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
