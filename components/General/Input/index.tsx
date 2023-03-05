import React, { useContext } from 'react'
import { StyleSheet, TextInput } from 'react-native'

import { Color, ColorDark, Typography, TypographyDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'

const Input: React.FC<TextInput['props']> = props => {
  const theme = useContext(ThemeContext)

  return (
    <TextInput
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect={false}
      {...props}
      style={[
        styles.input,
        {
          borderColor: theme.scheme === 'LIGHT' ? Color.Third : ColorDark.Third,
          color: theme.scheme === 'LIGHT' ? Typography.Primary : TypographyDark.Primary,
        },
      ]}
    />
  )
}

export default Input

const styles = StyleSheet.create({
  input: {
    height: 34,
    minWidth: '100%',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
})
