import { faArchive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { ThemeContext } from '../../../../feature/theme/themeContext'

const styles = StyleSheet.create({
  container: {
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
  const theme = useContext(ThemeContext)

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryColor }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesomeIcon icon={faArchive} style={styles.icon} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  )
}

export default Archive
