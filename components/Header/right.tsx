import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useContext } from 'react'

import { Typography, TypographyDark } from '../../constants/Colors'
import { ThemeContext } from '../../feature/theme/themeContext'
import { GroupProps } from '../../navigation/types'
import ThemedPressable from '../General/ThemedPressable'

const SettingButton: React.FC = () => {
  const theme = useContext(ThemeContext)
  const navigation = useNavigation<GroupProps['navigation']>()

  const handlePress = useCallback(() => {
    navigation.setParams({
      showSetting: true,
    })
  }, [])

  return (
    <ThemedPressable onPress={handlePress}>
      <FontAwesomeIcon
        style={{
          color: theme.scheme === 'LIGHT' ? Typography.Primary : TypographyDark.Primary,
        }}
        icon={faEllipsis}
      />
    </ThemedPressable>
  )
}

export default SettingButton
