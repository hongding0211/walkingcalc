import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, View } from 'react-native'
import { useDispatch } from 'react-redux'

import Button from '../../components/General/Button'
import Input from '../../components/General/Input'
import ThemedText from '../../components/General/Themed/Text'
import ThemedView from '../../components/General/Themed/View'
import useToast from '../../components/Toast/useToast'
import { setLoading } from '../../feature/general/generalSlice'
import { setToken } from '../../feature/user/userSlice'
import { useLogin, useRegister } from '../../services/user'
import styles from './style'

const Login: React.FC = () => {
  const { t } = useTranslation('login')
  const { trigger: triggerLogin } = useLogin()
  const { trigger: triggerRegister } = useRegister()
  const dispatch = useDispatch()
  const toast = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const login = useCallback(() => {
    if (!email || !password) {
      toast(t('loginFail') + '')
      return
    }
    dispatch(setLoading({ status: true }))
    triggerLogin({
      body: {
        type: 'local',
        credentials: {
          email,
          password,
        },
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
  }, [email, password])

  const register = useCallback(() => {
    if (!email || !password || !name) {
      toast(t('registerFail') + '')
      return
    }
    dispatch(setLoading({ status: true }))
    triggerRegister({
      body: {
        type: 'local',
        credentials: {
          email,
          password,
          profile: {
            name,
          },
        },
      },
    })
      .then(res => {
        if (res?.success) {
          return triggerLogin({
            body: {
              type: 'local',
              credentials: {
                email,
                password,
              },
            },
          })
        }
        return Promise.reject(new Error('registerFail'))
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
        toast(t('registerFail') + '')
      })
      .finally(() => {
        dispatch(setLoading({ status: false }))
      })
  }, [email, password, name])

  const handleSubmit = useCallback(() => {
    if (isRegister) {
      register()
    } else {
      login()
    }
  }, [isRegister, login, register])

  const handleSwitchMode = useCallback(() => {
    setIsRegister(!isRegister)
  }, [isRegister])

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

        <View style={styles.form}>
          {isRegister && (
            <Input
              value={name}
              onChangeText={setName}
              placeholder={t('name') + ''}
              textContentType="name"
            />
          )}
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder={t('email') + ''}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder={t('password') + ''}
            secureTextEntry
            textContentType="password"
          />
        </View>

        <View style={styles.btnGroup}>
          <Button
            title={isRegister ? t('register') : t('login')}
            onPress={handleSubmit}
          />
          <Button
            title={isRegister ? t('useLogin') : t('useRegister')}
            onPress={handleSwitchMode}
          />
        </View>
      </View>
    </ThemedView>
  )
}

export default Login
