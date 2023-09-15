import * as Localization from 'expo-localization'

export default function getLocales(): 'cn' | 'en' {
  const l = Localization.getLocales()
  if (l?.length > 0) {
    if (l[0]?.languageCode === 'zh') {
      return 'cn'
    }
  }
  return 'en'
}
