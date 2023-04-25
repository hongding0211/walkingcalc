import { useTranslation } from 'react-i18next'

export default function (namespace: string) {
  const { t } = useTranslation(namespace)
  return function (key: string) {
    return t(key) + ''
  }
}
