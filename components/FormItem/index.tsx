import React from 'react'
import { StyleSheet, View } from 'react-native'

import ThemedText from '../General/Text'

interface IFormItem {
  title?: string
  children?: React.ReactNode
}

const FormItem: React.FC<IFormItem> = props => {
  const { title = '', children } = props

  return (
    <View>
      <ThemedText style={styles.title}>{title}</ThemedText>
      {children}
    </View>
  )
}

export default FormItem

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
})
