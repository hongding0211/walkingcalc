import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as Haptics from 'expo-haptics'
import React, { useCallback, useContext } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'
import ThemedText from '../Themed/Text'

interface IRadio {
  value?: any
  onChange?: (value?: any) => void
  options?: {
    value: any
    title: string
  }[]
}

interface ISingleRadio {
  title?: string
  selected?: boolean
  onPress?: () => void
}

const SingleRadio: React.FC<ISingleRadio> = props => {
  const theme = useContext(ThemeContext)

  return (
    <Pressable
      onPress={props.onPress}
      style={styles.container}
    >
      <View
        style={[
          styles.dot,
          {
            backgroundColor: theme.scheme === 'LIGHT' ? Color.Third : ColorDark.Third,
          },
          props.selected
            ? {
                backgroundColor: Color.Primary,
              }
            : {},
        ]}
      >
        {props.selected && (
          <FontAwesomeIcon
            icon={faCircle}
            size={6}
            style={{ color: '#fff' }}
          />
        )}
      </View>
      <ThemedText style={{ fontWeight: '500' }}>{props.title}</ThemedText>
    </Pressable>
  )
}

const Radio: React.FC<IRadio> = props => {
  const { value, onChange, options } = props

  const handlePress = useCallback((value: any) => {
    Haptics.selectionAsync().then()
    onChange && onChange(value)
  }, [])

  return (
    <View style={styles.group}>
      {options?.map(o => (
        <SingleRadio
          key={o.value}
          title={o.title}
          selected={o.value === value}
          onPress={() => handlePress(o.value)}
        />
      ))}
    </View>
  )
}

export default Radio

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  dot: {
    borderRadius: 9999,
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
