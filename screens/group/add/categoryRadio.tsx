import * as Haptics from 'expo-haptics'
import React, { useCallback } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import ThemedText from '../../../components/General/Themed/Text'
import categoryMap from '../../../constants/Category'
import { Color } from '../../../constants/Colors'

const options = Object.keys(categoryMap).map(k => ({
  key: k,
  // @ts-ignore
  icon: categoryMap[k],
}))

const SingleRadio: React.FC<any> = props => {
  const { icon, selected } = props
  return (
    <Pressable
      onPress={props.onPress}
      style={[styles.container, selected ? { borderColor: Color.Primary } : {}]}
    >
      <ThemedText style={[{ fontSize: 20 }]}>{icon}</ThemedText>
    </Pressable>
  )
}

const Category: React.FC<any> = props => {
  const { value, onChange } = props

  const handlePress = useCallback((value: any) => {
    Haptics.selectionAsync().then()
    onChange && onChange(value)
  }, [])

  return (
    <View style={styles.group}>
      {options?.map(o => (
        <SingleRadio
          icon={o.icon}
          key={o.key}
          selected={o.key === value}
          onPress={() => handlePress(o.key)}
        />
      ))}
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  container: {
    alignItems: 'center',
    columnGap: 6,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0)',
    padding: 4,
    paddingVertical: 8,
  },
  text: {
    fontSize: 12,
    marginTop: 2,
  },
})
