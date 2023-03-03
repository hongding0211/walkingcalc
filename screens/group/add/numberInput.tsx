import React, { useContext } from 'react'
import { TextInput, StyleSheet } from 'react-native'

import { Color, ColorDark, Typography, TypographyDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'

const NumberInput: React.FC<TextInput['props']> = props => {
  const theme = useContext(ThemeContext)

  return (
    <TextInput
      {...props}
      style={[
        styles.input,
        {
          borderColor: theme.scheme === 'LIGHT' ? Color.Third : ColorDark.Third,
          color: theme.scheme === 'LIGHT' ? Typography.Primary : TypographyDark.Primary,
        },
      ]}
      placeholder="0.00"
      keyboardType="numeric"
    />
  )
}

export default NumberInput

const styles = StyleSheet.create({
  input: {
    height: 60,
    minWidth: '100%',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'right',
  },
})
