import React, { useEffect } from 'react'
import WebView from 'react-native-webview'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../app/store'
import { SSO_MY } from '../../../constants/Config'
import { setUpdate } from '../../../feature/user/userSlice'

const SsoMy: React.FC = () => {
  const dispatch = useDispatch()
  const token = useAppSelector(state => state.user.token)

  useEffect(() => {
    return () => {
      dispatch(
        setUpdate({
          update: true,
        })
      )
    }
  }, [dispatch])

  const injectedAuthCookie = `
    (function() {
      var token = ${JSON.stringify(token || '')};
      if (token) {
        document.cookie = 'accessToken=' + token + '; path=/; SameSite=Lax';
      }
    })();
    true;
  `

  return (
    <WebView
      source={{
        uri: SSO_MY,
        ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
      }}
      cacheEnabled={false}
      sharedCookiesEnabled
      thirdPartyCookiesEnabled
      injectedJavaScriptBeforeContentLoaded={injectedAuthCookie}
    />
  )
}

export default SsoMy
