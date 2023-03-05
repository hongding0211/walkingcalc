import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { AvatarColorPalettes } from '../../../constants/Colors'

interface IAvatar {
  source?: string
  name?: string
  size?: number
}

const Avatar: React.FC<IAvatar> = props => {
  const { source, name = 'User', size = 40 } = props

  if (source) {
    return (
      <Image
        source={{ uri: source }}
        defaultSource={require('./fallbackAvatar.png')}
        style={{ width: size, height: size, borderRadius: 99999, resizeMode: 'cover' }}
      />
    )
  }

  const charCode = name.charCodeAt(0) % 5

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          backgroundColor: AvatarColorPalettes[charCode],
        },
      ]}
    >
      <Text style={[styles.text, { fontSize: Math.round(size / 2) }]}>{name[0]}</Text>
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 99999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '500',
  },
})
