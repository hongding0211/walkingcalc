import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import WebView from 'react-native-webview'
import { useDispatch } from 'react-redux'

import useToast from '../../../components/Toast/useToast'
import { SSO_LOGIN_URL, SSO_REDIRECT_URL } from '../../../constants/Config'
import { setLoading } from '../../../feature/general/generalSlice'
import { setToken } from '../../../feature/user/userSlice'
import { LoginProps } from '../../../navigation/types'

const queryValue = (source: string, key: string) => {
  const params = source.split('&')
  const match = params.find(item => item.split('=')[0] === key)
  const value = match?.split('=').slice(1).join('=')
  return value ? decodeURIComponent(value) : undefined
}

const tokenFromRedirectUrl = (url: string) => {
  const hash = url.split('#')[1]
  if (hash) {
    return (
      queryValue(hash, 'accessToken') ||
      queryValue(hash, 'token') ||
      decodeURIComponent(hash.split('&')[0])
    )
  }

  const query = url.split('?')[1]
  if (!query) {
    return undefined
  }
  return (
    queryValue(query.split('#')[0], 'accessToken') || queryValue(query, 'token')
  )
}

const SSO: React.FC = () => {
  const [showWebview, setShowWebView] = useState(true)
  const hasHandledRedirect = useRef(false)
  const navigation = useNavigation<LoginProps['navigation']>()
  const dispatch = useDispatch()
  const toast = useToast()
  const { t } = useTranslation('login')

  const redirectUrl = useMemo(() => SSO_REDIRECT_URL, [])
  const authUrl = useMemo(
    () => `${SSO_LOGIN_URL}?redirect=${encodeURIComponent(redirectUrl)}`,
    [redirectUrl]
  )

  const handleRedirect = useCallback(
    (url: string) => {
      if (hasHandledRedirect.current) {
        return true
      }

      if (!url.startsWith(redirectUrl)) {
        return false
      }

      const token = tokenFromRedirectUrl(url)
      if (!token) {
        hasHandledRedirect.current = true
        toast(t('loginFail') + '')
        return true
      }

      hasHandledRedirect.current = true
      setShowWebView(false)
      dispatch(setLoading({ status: true }))
      dispatch(
        setToken({
          token,
        })
      )
      dispatch(setLoading({ status: false }))
      navigation.goBack()
      return true
    },
    [dispatch, navigation, redirectUrl, t, toast]
  )

  const handleNavStateChange = useCallback(
    (state: any) => {
      handleRedirect(state.url)
    },
    [handleRedirect]
  )

  return (
    <>
      {showWebview && (
        <WebView
          source={{ uri: authUrl }}
          onNavigationStateChange={handleNavStateChange}
          onShouldStartLoadWithRequest={request => !handleRedirect(request.url)}
          cacheEnabled={false}
          injectedJavaScript="(function(){localStorage.clear()})()"
        />
      )}
    </>
  )
}

export default SSO
