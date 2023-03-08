import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { setIsLogin, setIsLoginComplete, setToken, setUserData } from './userSlice'
import { useAppSelector } from '../../app/store'
import useToast from '../../components/Toast/useToast'
import { useUserInfo } from '../../services/user'
import { setLoading } from '../general/generalSlice'

const useUser = () => {
  const [hasReadToken, setHasReadToken] = useState(false)

  const dispatch = useDispatch()
  const { trigger: triggerGetUserInfo } = useUserInfo()
  const token = useAppSelector(state => state.user.token)
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
      triggerGetUserInfo({})
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

  return null
}

export default useUser
