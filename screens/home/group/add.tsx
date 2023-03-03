import { faPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import Divider from '../../../components/General/Divider'
import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'

const IconItem: React.FC<{ icon?: any; title?: string; onPress?: () => void }> = ({ icon, title, onPress }) => {
  const theme = useContext(ThemeContext)

  return (
    <Pressable
      style={({ pressed }) => [
        styles.iconContainer,
        pressed
          ? {
              backgroundColor: theme.scheme === 'LIGHT' ? Color.Highlight : ColorDark.Highlight,
            }
          : {},
      ]}
      onPress={onPress}
    >
      <FontAwesomeIcon
        icon={icon}
        size={40}
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}

interface IAddGroup {
  onCreateGroup?: () => void
  onJoinGroup?: () => void
}

const AddGroup: React.FC<IAddGroup> = props => {
  const { t } = useTranslation('home')
  const { onCreateGroup, onJoinGroup } = props

  return (
    <View style={styles.container}>
      <IconItem
        icon={faPlus}
        title={t('createGroup') + ''}
        onPress={onCreateGroup}
      />
      <Divider type="Vertical" />
      <IconItem
        icon={faUserGroup}
        title={t('joinGroup') + ''}
        onPress={onJoinGroup}
      />
    </View>
  )
}

export default AddGroup

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  icon: {
    color: Color.Primary,
  },
  title: {
    fontWeight: '600',
    color: Color.Primary,
    marginTop: 16,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 30,
  },
})
