import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet } from 'react-native'

import { useAppSelector } from '../../../app/store'
import ThemedText from '../../../components/General/Themed/Text'
import ThemedView from '../../../components/General/Themed/View'
import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'
import { SettingsProps } from '../../../navigation/types'

interface IItem {
  title?: any
  onPress?: () => void
}

interface IMenu {
  onShowAbout?: () => void
  onTouchEnd?: () => void
}

const Item: React.FC<IItem> = ({ title, onPress }) => {
  const theme = useContext(ThemeContext)

  return (
    <Pressable
      style={[
        styles.item,
        {
          borderBottomColor:
            theme.scheme === 'LIGHT' ? Color.Third : ColorDark.Third,
        },
      ]}
      onPress={onPress}
    >
      <ThemedText style={styles.itemText}>{title}</ThemedText>
    </Pressable>
  )
}

const Menu: React.FC<IMenu> = ({ onShowAbout, onTouchEnd }) => {
  const userInfo = useAppSelector(state => state.user.data)
  const { t } = useTranslation('home')
  const navigation = useNavigation<SettingsProps['navigation']>()

  const handleSettings = useCallback(() => {
    navigation.navigate('Settings')
  }, [])

  return (
    <ThemedView style={styles.menu} onTouchEnd={onTouchEnd}>
      <Item title={userInfo?.name} />
      <Item title={t('settings')} onPress={handleSettings} />
      <Item title={t('about')} onPress={onShowAbout} />
    </ThemedView>
  )
}

export default Menu

const styles = StyleSheet.create({
  menu: {
    padding: 4,
    borderRadius: 4,
    width: 110,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    flex: 1,
    alignItems: 'center',
  },
  itemText: {
    fontWeight: '500',
  },
})
