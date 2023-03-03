import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { Color } from '../../../constants/Colors'

interface ITag {
  children?: React.ReactNode
}

const Tag: React.FC<ITag> = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  )
}

export default Tag

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Primary,
    height: 20,
    paddingHorizontal: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
})
