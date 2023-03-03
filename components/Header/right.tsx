import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useContext } from 'react'
import { Pressable } from 'react-native'

import { Typography, TypographyDark } from '../../constants/Colors'
import { ThemeContext } from '../../feature/theme/themeContext'

const SettingButton: React.FC = () => {
  const theme = useContext(ThemeContext)

  return (
    <Pressable>
      <FontAwesomeIcon
        style={{
          color: theme.scheme === 'LIGHT' ? Typography.Primary : TypographyDark.Primary,
        }}
        icon={faEllipsis}
      />
    </Pressable>
  )
}

export default SettingButton
