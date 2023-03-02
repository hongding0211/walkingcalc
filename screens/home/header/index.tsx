import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, View } from 'react-native'

import Menu from './menu'
import { useAppSelector } from '../../../app/store'
import Avatar from '../../../components/General/Avatar'
import Popover from '../../../components/General/Popover'
import ThemedText from '../../../components/General/Text'
import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'

interface IHeader {
  onAdd?: () => void
  onShowAbout?: () => void
  onLogout?: () => void
}

const Header: React.FC<IHeader> = ({ onAdd, onShowAbout, onLogout }) => {
  const [showPopoverContent, setShowPopoverContent] = useState(false)

  const userInfo = useAppSelector(state => state.user.data)
  const { t } = useTranslation('home')
  const theme = useContext(ThemeContext)

  const handleAddGroup = useCallback(() => {
    onAdd && onAdd()
  }, [])

  return (
    <View style={styles.header}>
      <Pressable
        onPress={handleAddGroup}
        style={({ pressed }) => [
          styles.left,
          pressed ? (theme.scheme === 'LIGHT' ? styles.pressed : styles.pressedDark) : {},
        ]}
      >
        <ThemedText style={styles.title}>{t('group')}</ThemedText>
        <FontAwesomeIcon
          icon={faCirclePlus}
          style={styles.addBtn}
        />
      </Pressable>
      <Popover
        content={
          <Menu
            onShowAbout={onShowAbout}
            onLogout={onLogout}
            onTouchEnd={() => setShowPopoverContent(false)}
          />
        }
        show={showPopoverContent}
        align="flex-end"
      >
        <Pressable onPress={() => setShowPopoverContent(!showPopoverContent)}>
          <Avatar
            name={userInfo?.name}
            source={userInfo?.avatar}
          />
        </Pressable>
      </Popover>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  pressed: {
    backgroundColor: Color.Highlight,
    borderRadius: 8,
  },
  pressedDark: {
    backgroundColor: ColorDark.Highlight,
    borderRadius: 8,
  },
  addBtn: {
    color: Color.Primary,
    marginLeft: 8,
  },
})
