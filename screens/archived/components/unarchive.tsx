import { faFileExport } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Color } from '../../../constants/Colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Gold,
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    color: '#fff',
    marginLeft: 16,
    marginRight: 8,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
})

interface IUnarchive {
  title: string
  index: number
  total: number
}

const Unarchive: React.FC<IUnarchive> = props => {
  const { title, index, total } = props

  return (
    <View
      style={[
        styles.container,
        {
          borderTopLeftRadius: index === 0 ? 12 : 0,
          borderTopRightRadius: index === 0 ? 12 : 0,
          borderBottomLeftRadius: index === total - 1 ? 12 : 0,
          borderBottomRightRadius: index === total - 1 ? 12 : 0,
        },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesomeIcon icon={faFileExport} style={styles.icon} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  )
}

export default Unarchive
