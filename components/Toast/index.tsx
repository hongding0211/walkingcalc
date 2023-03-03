import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'

import { ThemeContext } from '../../feature/theme/themeContext'
import ThemedText from '../General/Themed/Text'

const Toast: React.FC<{ title: string }> = ({ title = '' }) => {
  const theme = useContext(ThemeContext)

  return (
    <View style={[styles.container, theme.scheme === 'LIGHT' ? styles.bg : styles.bgDark]}>
      <ThemedText style={styles.text}>{title}</ThemedText>
    </View>
  )
}

export default Toast

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  bg: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  bgDark: {
    backgroundColor: 'rgba(35,35,35,0.8)',
  },
  text: {
    fontWeight: '600',
  },
})
