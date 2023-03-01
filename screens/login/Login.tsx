import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Image, Pressable, Text, View } from 'react-native'

import styles from './style'

const Login: React.FC = () => {
  const navigation = useNavigation<any>()

  const handleLoginWithSSO = useCallback(() => {
    navigation.navigate('SSO')
  }, [])

  return <View style={styles.container} />
}

export default Login
