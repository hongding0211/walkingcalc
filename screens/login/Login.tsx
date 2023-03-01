import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, View } from 'react-native'

import styles from './style'
import Button from '../../components/Button'
import ThemedText from '../../components/General/Text'
import ThemedView from '../../components/General/View'

const Login: React.FC = () => {
  const navigation = useNavigation<any>()
  const { t } = useTranslation('login')

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
          {t('subTitle')}
        </ThemedText>
      </View>

      <View style={styles.btnGroup}>
        <Button
          title={t('login')}
          onPress={handleLoginWithSSO}
        />
      </View>
    </ThemedView>
  )
}

export default Login
