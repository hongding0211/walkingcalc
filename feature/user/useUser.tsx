import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setIsLogin, setIsLoginComplete, setToken, setUserData } from './userSlice'
import { useAppSelector } from '../../app/store'
import { useUserInfo } from '../../services/user'

const useUser = () => {
  const [readyGetUserInfo, setReadyGetUserInfo] = useState(false)

  const [hasReadToken, setHasReadToken] = useState(false)

  const dispatch = useDispatch()
  const { data: userInfoData, mutate: mutateUserInfoData } = useUserInfo(undefined, readyGetUserInfo)
  const token = useAppSelector(state => state.user.token)

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
      if (!readyGetUserInfo) {
        setReadyGetUserInfo(true)
      } else {
        // 先变成 undefined 再进行 revalidation
        // 使得能够正确触发 useEffect()
        mutateUserInfoData(undefined).then(() => {
          mutateUserInfoData().then()
        })
      }
    }
  }, [token, hasReadToken])

  useEffect(() => {
    if (userInfoData && userInfoData.success && userInfoData.data) {
      dispatch(
        setUserData({
          data: userInfoData.data,
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
    }
    if (userInfoData && !userInfoData.success) {
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
