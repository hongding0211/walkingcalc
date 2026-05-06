import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, View } from 'react-native'
import { useDispatch } from 'react-redux'

import Button from '../../components/General/Button'
import ThemedText from '../../components/General/Themed/Text'
import ThemedView from '../../components/General/Themed/View'
import useToast from '../../components/Toast/useToast'
import { SSO_LOGIN_URL } from '../../constants/Config'
import { setLoading } from '../../feature/general/generalSlice'
import { setToken } from '../../feature/user/userSlice'
import styles from './style'

WebBrowser.maybeCompleteAuthSession()

const tokenFromRedirectUrl = (url: string) => {
  const hash = url.split('#')[1]
  if (!hash) {
    return undefined
  }

  const params = new URLSearchParams(hash)
  return (
    params.get('accessToken') ||
    params.get('token') ||
    decodeURIComponent(hash.split('&')[0])
  )
}

const Login: React.FC = () => {
  const { t } = useTranslation('login')
  const dispatch = useDispatch()
  const toast = useToast()
  const [isSigningIn, setIsSigningIn] = useState(false)

  const login = useCallback(async () => {
    const redirectUrl = Linking.createURL('auth/callback')
    const authUrl = new URL(SSO_LOGIN_URL)
    authUrl.searchParams.set('redirect', redirectUrl)

    setIsSigningIn(true)
    dispatch(setLoading({ status: true }))
    try {
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl.toString(),
        redirectUrl
      )
      if (result.type !== 'success') {
        return
      }

      const token = tokenFromRedirectUrl(result.url)
      if (!token) {
        toast(t('loginFail') + '')
        return
      }

      dispatch(
        setToken({
          token,
        })
      )
    } catch {
      toast(t('loginFail') + '')
    } finally {
      setIsSigningIn(false)
      dispatch(setLoading({ status: false }))
    }
  }, [dispatch, t, toast])

  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.center}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.img}
          />
          <ThemedText style={styles.title}>Walking Calculator</ThemedText>
          <ThemedText type="SECOND" style={styles.subTitle}>
            {t('subTitle')}
          </ThemedText>
        </View>

        <View style={styles.btnGroup}>
          <Button
            title={t('loginWithHong97')}
            onPress={login}
            disabled={isSigningIn}
          />
        </View>
      </View>
    </ThemedView>
  )
}

export default Login
