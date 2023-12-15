import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Color } from '../../../constants/Colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Danger,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 16,
  },
  icon: {
    color: '#fff',
    marginLeft: 8,
    marginRight: 16,
  },
})

const Delete: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesomeIcon icon={faTrashCan} style={styles.icon} />
      </View>
    </View>
  )
}

export default Delete
