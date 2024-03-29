import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../app/store'
import useToast from '../../components/Toast/useToast'
import { useUserInfo } from '../../services/user'
import { setLoading } from '../general/generalSlice'
import {
  setIsLogin,
  setIsLoginComplete,
  setToken,
  setUpdate,
  setUserData,
} from './userSlice'

const useUser = () => {
  const [hasReadToken, setHasReadToken] = useState(false)

  const dispatch = useDispatch()
  const { trigger: triggerGetUserInfo } = useUserInfo()
  const token = useAppSelector(state => state.user.token)
  const update = useAppSelector(state => state.user.update)
  const { t } = useTranslation('login')
  const toast = useToast()

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(v => {
        if (v != null) {
          dispatch(
            setToken({
              token: v,
            })
          )
        }
      })
      .catch(() => {
        dispatch(
          setToken({
            token: undefined,
          })
        )
      })
      .finally(() => {
        setHasReadToken(true)
      })
  }, [])

  useEffect(() => {
    if (hasReadToken && !token) {
      dispatch(
        setIsLoginComplete({
          isLoginComplete: true,
        })
      )
      return
    }
    if (token) {
      dispatch(setLoading({ status: true }))
      Notifications.getDevicePushTokenAsync()
        .then(v => {
          return triggerGetUserInfo({
            params: {
              pushToken: v.data,
            },
          })
        })
        .then(res => {
          if (res?.success && res?.data) {
            dispatch(
              setUserData({
                data: res.data,
              })
            )
            dispatch(
              setIsLogin({
                isLogin: true,
              })
            )
          }
        })
        .catch(() => {
          toast(t('loginFail') + '')
          dispatch(
            setToken({
              token: undefined,
            })
          )
          dispatch(
            setUserData({
              data: undefined,
            })
          )
        })
        .finally(() => {
          dispatch(setLoading({ status: false }))
          dispatch(
            setIsLoginComplete({
              isLoginComplete: true,
            })
          )
        })
    }
  }, [token, hasReadToken])

  useEffect(() => {
    if (token && update) {
      dispatch(setLoading({ status: true }))
      Notifications.getDevicePushTokenAsync()
        .then(v => {
          return triggerGetUserInfo({
            params: {
              pushToken: v.data,
            },
          })
        })
        .then(res => {
          if (res?.success && res?.data) {
            dispatch(
              setUserData({
                data: res.data,
              })
            )
            dispatch(
              setIsLogin({
                isLogin: true,
              })
            )
          }
        })
        .catch(() => {
          toast(t('loginFail') + '')
          dispatch(
            setToken({
              token: undefined,
            })
          )
          dispatch(
            setUserData({
              data: undefined,
            })
          )
        })
        .finally(() => {
          dispatch(setLoading({ status: false }))
          dispatch(
            setIsLoginComplete({
              isLoginComplete: true,
            })
          )
          dispatch(
            setUpdate({
              update: false,
            })
          )
        })
    }
  }, [token, update])

  return null
}

export default useUser
