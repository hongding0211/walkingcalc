import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

import { Color } from '../../../constants/Colors'

interface IButton {
  type?: 'PRIMARY' | 'DANGER'
  title?: any
  icon?: any
  block?: boolean
  disabled?: boolean
  onPress?: () => void
}

const Button: React.FC<IButton> = ({
  type = 'PRIMARY',
  title = '',
  icon,
  block = false,
  disabled = false,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.btn, type === 'PRIMARY' ? styles.color : styles.colorDanger, block ? styles.block : {}]}
      disabled={disabled}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  color: {
    backgroundColor: Color.Primary,
  },
  colorDanger: {
    backgroundColor: Color.Danger,
  },
  block: {
    width: '100%',
  },
  title: {
    color: '#fff',
    fontWeight: '500',
  },
})

export default Button
