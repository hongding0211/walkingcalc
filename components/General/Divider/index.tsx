import React, { useContext } from 'react'
import { View } from 'react-native'

import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'

const Divider: React.FC<{ type?: 'Horizon' | 'Vertical' }> = props => {
  const { type = 'Horizon' } = props

  const theme = useContext(ThemeContext)

  if (type === 'Horizon') {
    return (
      <View
        style={[
          {
            backgroundColor:
              theme.scheme === 'LIGHT' ? Color.Third : ColorDark.Third,
          },
          {
            height: 1,
          },
        ]}
      />
    )
  } else {
    return (
      <View
        style={[
          {
            backgroundColor:
              theme.scheme === 'LIGHT' ? Color.Third : ColorDark.Third,
          },
          {
            width: 1,
          },
        ]}
      />
    )
  }
}

export default Divider
