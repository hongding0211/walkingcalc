import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Image, View } from 'react-native'

import styles from './style'
import ThemedText from '../../components/General/Text'
import ThemedView from '../../components/General/View'

const Login: React.FC = () => {
  const navigation = useNavigation<any>()

  const handleLoginWithSSO = useCallback(() => {
    navigation.navigate('SSO')
  }, [])

  return (
    <ThemedView style={styles.container}>
      <View style={styles.center}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.img}
        />
        <ThemedText style={styles.title}>Walking Calculator</ThemedText>
        <ThemedText
          type="SECOND"
          style={styles.subTitle}
        >
          登录以继续
        </ThemedText>
      </View>
    </ThemedView>
  )
}

export default Login
