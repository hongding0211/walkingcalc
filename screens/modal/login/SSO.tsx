import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import WebView from 'react-native-webview'
import { useDispatch } from 'react-redux'

import { SSO_URL } from '../../../constants/Config'
import { setToken } from '../../../feature/user/userSlice'
import { useLogin } from '../../../services/user'

const SSO: React.FC = () => {
  const [showWebview, setShowWebView] = useState(true)

  const ticketRef = useRef('')

  const { trigger: triggerLogin } = useLogin()
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleNavStateChange = useCallback((state: any) => {
    const { url } = state
    const decodedUrl = decodeURIComponent(url)
    const match = decodedUrl.match(/\?ticket=(.+)/)
    if (!match || match.length < 2) {
      return
    }
    setShowWebView(false)
    ticketRef.current = match[1]
  }, [])

  useEffect(() => {
    if (!showWebview) {
      triggerLogin({
        params: {
          type: 'sso',
          ticket: ticketRef.current,
        },
      })
        .then(res => {
          if (res?.success && res?.data?.token) {
            dispatch(
              setToken({
                token: res.data.token,
              })
            )
          }
        })
        .finally(() => {
          navigation.goBack()
        })
    }
  }, [showWebview])

  return (
    <>
      {showWebview && (
        <WebView
          source={{ uri: SSO_URL }}
          onNavigationStateChange={handleNavStateChange}
          cacheEnabled={false}
        />
      )}
    </>
  )
}

export default SSO
