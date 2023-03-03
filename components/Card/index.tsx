import React from 'react'
import { StyleSheet, View } from 'react-native'

import ThemedView from '../General/View'

interface ICard {
  children?: React.ReactNode
}

const Card: React.FC<ICard> = ({ children }) => {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>{children}</View>
    </ThemedView>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
  },
  content: {
    margin: 20,
  },
})
