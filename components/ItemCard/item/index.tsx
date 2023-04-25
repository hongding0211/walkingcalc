import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'

import { Typography, TypographyDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'
import ThemedText from '../../General/Themed/Text'

interface IItem {
  showArrow?: boolean
  title?: string
  onPress?: () => void
  children?: React.ReactNode[]
}

const Item: React.FC<IItem> = props => {
  const { showArrow, title, onPress, children } = props

  const theme = useContext(ThemeContext)

  return (
    <View style={styles.container}>
      <ThemedText>{title || ''}</ThemedText>
      <View style={styles.container}>
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
      </View>
    </View>
  )
}

export default Item

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
