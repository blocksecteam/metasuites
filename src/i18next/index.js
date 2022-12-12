import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en'
import cn from './zh-CN.js'
import ja from './ja'
import ko from './ko'
import ru from './ru'

const resources = {
  en: {
    translation: en
  },
  ja: {
    translation: ja
  },
  ko: {
    translation: ko
  },
  ru: {
    translation: ru
  },
  'zh-CN': {
    translation: cn
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng:
    (navigator.language ? navigator.language : navigator.userLanguage) || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})
