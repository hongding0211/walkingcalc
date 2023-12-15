import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, View } from 'react-native'
import { useDispatch } from 'react-redux'

import Button from '../../components/General/Button'
import ThemedText from '../../components/General/Themed/Text'
import ThemedView from '../../components/General/Themed/View'
import useToast from '../../components/Toast/useToast'
import { setLoading } from '../../feature/general/generalSlice'
import { setToken } from '../../feature/user/userSlice'
import { LoginProps } from '../../navigation/types'
import { useLogin } from '../../services/user'
import styles from './style'

const Login: React.FC = () => {
  const navigation = useNavigation<LoginProps['navigation']>()
  const { t } = useTranslation('login')
  const route = useRoute<LoginProps['route']>()
  const { trigger: triggerLogin } = useLogin()
  const dispatch = useDispatch()
  const toast = useToast()

  const { ticket, type } = route.params || {}

  const handleLoginWithSSO = useCallback(() => {
    navigation.navigate('SSO')
  }, [])

  useEffect(() => {
    if (!ticket || !type) {
      return
    }
    dispatch(setLoading({ status: true }))
    triggerLogin({
      params: {
        type,
        ticket,
      },
    })
      .then(res => {
        if (res?.success && res?.data?.token) {
          dispatch(
            setToken({
              token: res.data.token,
            })
          )
          return
        }
        return Promise.reject(new Error('loginFail'))
      })
      .catch(() => {
        toast(t('loginFail') + '')
      })
      .finally(() => {
        dispatch(setLoading({ status: false }))
      })
  }, [ticket, type])

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
          <Button title={t('login')} onPress={handleLoginWithSSO} />
        </View>
      </View>
    </ThemedView>
  )
}

export default Login
