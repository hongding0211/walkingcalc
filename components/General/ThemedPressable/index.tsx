import React, { useContext } from 'react'
import { Pressable, PressableProps } from 'react-native'

import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'

interface IThemedPressable {
  highLight?: boolean
  padding?: number
  borderRadius?: number
}

const ThemedPressable: React.FC<IThemedPressable & PressableProps> = props => {
  const { highLight = false, padding = 4, borderRadius = 4, style, ...restProps } = props

  const theme = useContext(ThemeContext)

  return (
    <Pressable
      style={({ pressed }) => [
        {
          padding,
          borderRadius,
        },
        highLight && pressed
          ? {
              backgroundColor: theme.scheme === 'LIGHT' ? Color.Third : ColorDark.Third,
            }
          : {},
        style,
      ]}
      {...restProps}
    />
  )
}

export default ThemedPressable
