import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import commonCn from './public/locales/cn/common.json'
import groupCn from './public/locales/cn/group.json'
import homeCn from './public/locales/cn/home.json'
import loginCn from './public/locales/cn/login.json'
import settingsCn from './public/locales/cn/settings.json'
import commonEn from './public/locales/en/common.json'
import groupEn from './public/locales/en/group.json'
import homeEn from './public/locales/en/home.json'
import loginEn from './public/locales/en/login.json'
import settingsEn from './public/locales/en/settings.json'
import getLocales from './utils/locales'

const locales = getLocales()

const resources = {
  cn: {
    common: commonCn,
    login: loginCn,
    home: homeCn,
    group: groupCn,
    settings: settingsCn,
  },
  en: {
    common: commonEn,
    login: loginEn,
    home: homeEn,
    group: groupEn,
    settings: settingsEn,
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
