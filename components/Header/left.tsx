import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useContext } from 'react'
import { Pressable, StyleSheet } from 'react-native'

import { Typography, TypographyDark } from '../../constants/Colors'
import { ThemeContext } from '../../feature/theme/themeContext'
import ThemedText from '../General/Themed/Text'

const BackButton: React.FC<{ title: string }> = ({ title }) => {
  const theme = useContext(ThemeContext)
  const navigation = useNavigation()

  const handleBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    }
  }, [])

  return (
    <Pressable
      style={styles.container}
      onPress={handleBack}
    >
      <FontAwesomeIcon
        icon={faAngleLeft}
        size={18}
        style={{
          color: theme.scheme === 'LIGHT' ? Typography.Primary : TypographyDark.Primary,
        }}
      />
      <ThemedText style={styles.title}>{title}</ThemedText>
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  title: {
    fontSize: 18,
  },
})
