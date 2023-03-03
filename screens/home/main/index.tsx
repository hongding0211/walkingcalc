import React from 'react'
import { StyleSheet, View } from 'react-native'

import TopCard from './topCard'

const Main: React.FC = () => {
  return (
    <>
      <View style={styles.container}>
        <TopCard total={0} />
      </View>
    </>
  )
}

export default Main

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
})
