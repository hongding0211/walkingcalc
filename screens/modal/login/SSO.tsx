import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import WebView from 'react-native-webview'

import { SSO_URL } from '../../../constants/Config'
import { LoginProps } from '../../../navigation/types'

const SSO: React.FC = () => {
  const [showWebview, setShowWebView] = useState(true)
  const navigation = useNavigation<LoginProps['navigation']>()

  const handleNavStateChange = useCallback((state: any) => {
    const { url } = state
    const decodedUrl = decodeURIComponent(url)
    const match = decodedUrl.match(/\?ticket=(.+)/)
    if (!match || match.length < 2) {
      return
    }
    navigation.navigate('Login', {
      ticket: match[1],
      type: 'sso',
    })
    setShowWebView(false)
  }, [])

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
