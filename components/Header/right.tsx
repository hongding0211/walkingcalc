import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useContext } from 'react'
import { Pressable } from 'react-native'

import { Typography, TypographyDark } from '../../constants/Colors'
import { ThemeContext } from '../../feature/theme/themeContext'

const SettingButton: React.FC = () => {
  const theme = useContext(ThemeContext)
  const navigation = useNavigation<any>()

  const handlePress = useCallback(() => {
    navigation.setParams({
      showSetting: true,
    })
  }, [])

  return (
    <Pressable onPress={handlePress}>
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
