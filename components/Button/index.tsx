import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

import { Color } from '../../constants/Colors'

interface IButton {
  type?: 'PRIMARY' | 'DANGER'
  title?: any
  block?: boolean
  onPress?: () => void
}

const Button: React.FC<IButton> = ({ type = 'PRIMARY', title = '', block = false, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.btn, type === 'PRIMARY' ? styles.color : styles.colorDanger, block ? styles.block : undefined]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
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
