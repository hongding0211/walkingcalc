import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as Haptics from 'expo-haptics'
import React, { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, View } from 'react-native'
import Popover from 'react-native-popover-view'

import Menu from './menu'
import { useAppSelector } from '../../../app/store'
import Avatar from '../../../components/General/Avatar'
import ThemedText from '../../../components/General/Themed/Text'
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
    Haptics.selectionAsync().then()
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
        from={
          <Pressable
            onPress={() => {
              Haptics.selectionAsync().then()
              setShowPopoverContent(!showPopoverContent)
            }}
          >
            <Avatar
              name={userInfo?.name}
              source={userInfo?.avatar}
            />
          </Pressable>
        }
        isVisible={showPopoverContent}
        backgroundStyle={{
          opacity: 0,
        }}
        animationConfig={{
          duration: 0,
        }}
        onRequestClose={() => setShowPopoverContent(false)}
        popoverStyle={{
          borderRadius: 5,
          backgroundColor: theme.scheme === 'LIGHT' ? Color.Background : ColorDark.Background,
        }}
        arrowSize={{
          width: 0,
          height: 0,
        }}
        offset={8}
      >
        <Menu
          onShowAbout={onShowAbout}
          onLogout={onLogout}
          onTouchEnd={() => setShowPopoverContent(false)}
        />
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
