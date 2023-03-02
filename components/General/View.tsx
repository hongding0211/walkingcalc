import React, { useContext } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'

import { Color, ColorDark } from '../../constants/Colors'
import { ThemeContext } from '../../feature/theme/themeContext'

const ThemedView: React.FC<View['props']> = props => {
  const theme = useContext(ThemeContext)
  const { style, ...restProps } = props

  return (
    <SafeAreaView
      style={[style, theme.scheme === 'LIGHT' ? styles.light : styles.dark, styles.container]}
      {...restProps}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  light: {
    backgroundColor: Color.Background,
  },
  dark: {
    backgroundColor: ColorDark.Background,
  },
})

export default ThemedView
