import * as Notifications from 'expo-notifications'
import { useEffect, useRef } from 'react'
import { Platform } from 'react-native'

import { UserMeta } from '../../services/types/interface'
import { usePostUserMeta } from '../../services/user'
import getLocales from '../../utils/locales'

export default function useUserMeta() {
  const userMeta = useRef<UserMeta>({
    deviceInfo: {},
  })

  const { trigger } = usePostUserMeta()

  useEffect(() => {
    userMeta.current.language = getLocales()

    userMeta.current.deviceInfo.os = Platform.OS
    userMeta.current.deviceInfo.version = Platform.Version

    userMeta.current.lastOpened = Date.now()

    Promise.all([
      Notifications.getDevicePushTokenAsync().then(v => {
        userMeta.current.pushToken = v.data
        return v
      }),
    ]).then(() => {
      return trigger({
        body: {
          ...userMeta.current,
        },
      })
    })
  }, [])
}
