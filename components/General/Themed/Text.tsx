import React, { useContext } from 'react'
import { StyleSheet, Text } from 'react-native'

import { Typography, TypographyDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'

const ThemedText: React.FC<Text['props'] & { type?: 'FIRST' | 'SECOND' }> = props => {
  const theme = useContext(ThemeContext)
  const { style, type, ...restProps } = props

  return (
    <Text
      style={[
        theme.scheme === 'LIGHT'
          ? type === 'SECOND'
            ? styles.lightSecond
            : styles.light
          : type === 'SECOND'
          ? styles.darkSecond
          : styles.dark,
        style,
      ]}
      {...restProps}
    />
  )
}

const styles = StyleSheet.create({
  light: {
    color: Typography.Primary,
  },
  lightSecond: {
    color: Typography.Second,
  },
  dark: {
    color: TypographyDark.Primary,
  },
  darkSecond: {
    color: TypographyDark.Second,
  },
})

export default ThemedText
