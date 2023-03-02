import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, View } from 'react-native'

import { useAppSelector } from '../../../app/store'
import ThemedText from '../../../components/General/Text'
import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'

interface IItem {
  title?: any
  onPress?: () => void
}

interface IMenu {
  onLogout?: () => void
  onShowAbout?: () => void
}

const Item: React.FC<IItem> = ({ title, onPress }) => {
  const theme = useContext(ThemeContext)

  return (
    <Pressable
      style={[
        styles.item,
        {
          borderBottomColor: theme.scheme === 'LIGHT' ? Color.Third : ColorDark.Third,
        },
      ]}
      onPress={onPress}
    >
      <ThemedText style={styles.itemText}>{title}</ThemedText>
    </Pressable>
  )
}

const Menu: React.FC<IMenu> = ({ onLogout, onShowAbout }) => {
  const theme = useContext(ThemeContext)
  const userInfo = useAppSelector(state => state.user.data)
  const { t } = useTranslation('home')

  return (
    <View
      style={[
        styles.menu,
        { backgroundColor: theme.scheme === 'LIGHT' ? Color.BackgroundSecond : ColorDark.BackgroundSecond },
      ]}
    >
      <Item title={userInfo?.name} />
      <Item
        title={t('logout')}
        onPress={onLogout}
      />
      <Item
        title={t('about')}
        onPress={onShowAbout}
      />
    </View>
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
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  itemText: {
    fontWeight: '500',
  },
})
