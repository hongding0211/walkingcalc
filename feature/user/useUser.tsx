import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { setIsLogin, setIsLoginComplete, setToken, setUserData } from './userSlice'
import { useAppSelector } from '../../app/store'
import useToast from '../../components/Toast/useToast'
import { IGetUserInfo } from '../../services/types/interface'
import { useUserInfo } from '../../services/user'
import { setLoading } from '../general/generalSlice'

const useUser = () => {
  const [userInfoData, setUserInfoData] = useState<IGetUserInfo['response']['data'] | undefined>(undefined)
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
            setUserInfoData(res.data)
          }
        })
        .catch(() => {
          toast(t('loginFail') + '')
        })
        .finally(() => {
          dispatch(setLoading({ status: false }))
        })
    }
  }, [token, hasReadToken])

  useEffect(() => {
    if (userInfoData) {
      dispatch(
        setUserData({
          data: userInfoData,
        })
      )
      dispatch(
        setIsLoginComplete({
          isLoginComplete: true,
        })
      )
      dispatch(
        setIsLogin({
          isLogin: true,
        })
      )
    } else {
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
      dispatch(
        setIsLoginComplete({
          isLoginComplete: true,
        })
      )
    }
  }, [userInfoData])

  return null
}

export default useUser
