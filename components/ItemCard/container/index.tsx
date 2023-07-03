import React, { useContext, useMemo } from 'react'
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
  const { title, children } = props

  const theme = useContext(ThemeContext)

  const items = useMemo(
    () =>
      Array.isArray(children)
        ? React.Children.map(children, (child, index) => React.cloneElement(child, { index, total: children.length }))
        : React.cloneElement(children, { index: 0, total: 1 }),
    []
  )

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
          <View>{items}</View>
        )}
      </ThemedView>
    </View>
  )
}

export default Container

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
  },
  title: {
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 4,
  },
})
