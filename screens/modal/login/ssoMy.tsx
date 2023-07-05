import React, { useEffect } from 'react'
import WebView from 'react-native-webview'
import { useDispatch } from 'react-redux'

import { SSO_MY } from '../../../constants/Config'
import { setUpdate } from '../../../feature/user/userSlice'

const SsoMy: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(
        setUpdate({
          update: true,
        })
      )
    }
  }, [])

  return (
    <WebView
      source={{ uri: SSO_MY }}
      cacheEnabled={false}
    />
  )
}

export default SsoMy
