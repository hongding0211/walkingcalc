import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import groupCn from './public/locales/cn/group.json'
import homeCn from './public/locales/cn/home.json'
import loginCn from './public/locales/cn/login.json'
import groupEn from './public/locales/en/group.json'
import homeEn from './public/locales/en/home.json'
import loginEn from './public/locales/en/login.json'
import getLocales from './utlis/locales'

const locales = getLocales()

const resources = {
  cn: {
    login: loginCn,
    home: homeCn,
    group: groupCn,
  },
  en: {
    login: loginEn,
    home: homeEn,
    group: groupEn,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: locales,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
