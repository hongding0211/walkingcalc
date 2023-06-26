import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useContext } from 'react'
import { Pressable, StyleSheet } from 'react-native'

import { Color, Typography, TypographyDark, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'
import ThemedText from '../../General/Themed/Text'

interface IItem {
  showArrow?: boolean
  title?: string
  onPress?: () => void
  children?: React.ReactNode[] | React.ReactNode
  index: number
  total: number
}

const Item: React.FC<IItem> = props => {
  const { showArrow, title, onPress, children, index, total } = props

  const theme = useContext(ThemeContext)

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed ? (theme.scheme === 'LIGHT' ? Color.Highlight : ColorDark.Highlight) : undefined,
          borderTopLeftRadius: index === 0 ? 12 : 0,
          borderTopRightRadius: index === 0 ? 12 : 0,
          borderBottomLeftRadius: index === total - 1 ? 12 : 0,
          borderBottomRightRadius: index === total - 1 ? 12 : 0,
        },
      ]}
      onPress={onPress}
    >
      {title && <ThemedText>{title}</ThemedText>}
      {children}
      {showArrow && (
        <FontAwesomeIcon
          style={{
            color: theme.scheme === 'LIGHT' ? Typography.Second : TypographyDark.Second,
          }}
          size={14}
          icon={faAngleRight}
        />
      )}
    </Pressable>
  )
}

export default Item

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
})
