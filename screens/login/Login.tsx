import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, View } from 'react-native'

import Button from '../../components/General/Button'
import ThemedText from '../../components/General/Themed/Text'
import ThemedView from '../../components/General/Themed/View'
import { LoginProps } from '../../navigation/types'
import styles from './style'

const Login: React.FC = () => {
  const { t } = useTranslation('login')
  const navigation = useNavigation<LoginProps['navigation']>()
  const [isSigningIn, setIsSigningIn] = useState(false)

  const login = useCallback(() => {
    setIsSigningIn(true)
    navigation.navigate('SSO')
    setIsSigningIn(false)
  }, [navigation])

  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.center}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.img}
          />
          <ThemedText style={styles.title}>Walking Calculator</ThemedText>
          <ThemedText type="SECOND" style={styles.subTitle}>
            {t('subTitle')}
          </ThemedText>
        </View>

        <View style={styles.btnGroup}>
          <Button
            title={t('loginWithHong97')}
            onPress={login}
            disabled={isSigningIn}
          />
        </View>
      </View>
    </ThemedView>
  )
}

export default Login
