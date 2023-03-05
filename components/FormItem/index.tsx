import React from 'react'
import { StyleSheet, View } from 'react-native'

import ThemedText from '../General/Themed/Text'

interface IFormItem {
  title?: string
  children?: React.ReactNode
  style?: any
  type?: 'FIRST' | 'SECOND'
}

const FormItem: React.FC<IFormItem> = props => {
  const { title = '', children, style, type = 'FIRST' } = props

  return (
    <View>
      <ThemedText
        style={[styles.title, style]}
        type={type}
      >
        {title}
      </ThemedText>
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
