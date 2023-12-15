import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Color } from '../../../constants/Colors'

interface ITag {
  text: string
}

const Tag: React.FC<ITag> = props => {
  const text = useMemo(() => {
    if (props.text.length < 10) {
      return props.text
    }
    return props.text.slice(0, 10) + '...'
  }, [props.text])
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
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
