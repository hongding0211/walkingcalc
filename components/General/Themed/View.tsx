import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'

import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'

const ThemedView: React.FC<View['props']> = props => {
  const theme = useContext(ThemeContext)
  const { style, ...restProps } = props

  return (
    <View
      style={[theme.scheme === 'LIGHT' ? styles.light : styles.dark, style]}
      {...restProps}
    />
  )
}

const styles = StyleSheet.create({
  light: {
    backgroundColor: Color.Background,
  },
  dark: {
    backgroundColor: ColorDark.Background,
  },
})

export default ThemedView
