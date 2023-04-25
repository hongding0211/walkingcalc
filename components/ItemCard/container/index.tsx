import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'

import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'
import ThemedText from '../../General/Themed/Text'
import ThemedView from '../../General/Themed/View'

interface IContainer {
  title?: string
  children: React.ReactNode[] | React.ReactNode
}

const Container: React.FC<IContainer> = props => {
  const { title, children: items } = props

  const theme = useContext(ThemeContext)

  return (
    <View>
      {title && (
        <ThemedText
          type="SECOND"
          style={styles.title}
        >
          {title}
        </ThemedText>
      )}
      <ThemedView style={styles.container}>
        {Array.isArray(items) ? (
          items.map((item, index) => (
            <View
              style={[
                styles.item,
                {
                  borderBottomColor: theme.scheme === 'LIGHT' ? Color.Third : ColorDark.Third,
                  borderBottomWidth: index === items.length - 1 ? 0 : 1,
                },
              ]}
            >
              {item}
            </View>
          ))
        ) : (
          <View style={[styles.item]}>{items}</View>
        )}
      </ThemedView>
    </View>
  )
}

export default Container

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 4,
  },
  item: {
    paddingVertical: 16,
  },
})
