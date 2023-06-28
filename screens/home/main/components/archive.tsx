import { faArchive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { Color } from '../../../../constants/Colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Primary,
    justifyContent: 'center',
    flex: 1,
    borderRadius: 16,
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

interface IArchive {
  title: string
}

const Archive: React.FC<IArchive> = props => {
  const { title } = props

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesomeIcon
          icon={faArchive}
          style={styles.icon}
        />
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  )
}

export default Archive
