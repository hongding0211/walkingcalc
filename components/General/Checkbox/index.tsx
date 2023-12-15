import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'

import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'
import ThemedText from '../Themed/Text'
import ThemedPressable from '../ThemedPressable'

interface ICheckBox {
  value?: any[]
  onChange?: (value?: any[]) => void
  options?: {
    value: any
    title: string
  }[]
}

interface ISingleCheckbox {
  title?: string
  selected?: boolean
  onPress?: () => void
}

const SingleCheckbox: React.FC<ISingleCheckbox> = props => {
  const theme = useContext(ThemeContext)

  return (
    <ThemedPressable onPress={props.onPress} style={styles.container}>
      <View
        style={[
          styles.dot,
          {
            backgroundColor:
              theme.scheme === 'LIGHT' ? Color.Third : ColorDark.Third,
          },
          props.selected
            ? {
                backgroundColor: Color.Primary,
              }
            : {},
        ]}
      >
        {props.selected && (
          <FontAwesomeIcon icon={faCheck} size={10} style={{ color: '#fff' }} />
        )}
      </View>
      <ThemedText style={{ fontWeight: '500' }}>{props.title}</ThemedText>
    </ThemedPressable>
  )
}

const Checkbox: React.FC<ICheckBox> = props => {
  const { value, onChange, options } = props

  const set = useRef(new Set())

  useEffect(() => {
    set.current = new Set(value)
  }, [value])

  const handlePress = useCallback((v: any) => {
    if (!set.current.has(v)) {
      set.current.add(v)
    } else {
      set.current.delete(v)
    }
    onChange && onChange([...set.current])
  }, [])

  return (
    <View style={styles.group}>
      {options?.map(o => (
        <SingleCheckbox
          key={o.value}
          title={o.title}
          selected={value?.indexOf(o.value) !== -1}
          onPress={() => handlePress(o.value)}
        />
      ))}
    </View>
  )
}

export default Checkbox

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
    borderRadius: 2,
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
