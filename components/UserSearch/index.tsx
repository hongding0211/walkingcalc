import React, { useContext, useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Color, ColorDark } from '../../constants/Colors'
import { ThemeContext } from '../../feature/theme/themeContext'
import { useUserSearch } from '../../services/user'
import Input from '../General/Input'
import ThemedText from '../General/Text'
import ThemedView from '../General/View'

interface IItem {
  title?: any
  onPress?: () => void
}

interface IUsers {
  data?: {
    uuid: string
    name: string
    avatar: string
  }[]
}

const Item: React.FC<IItem> = ({ title, onPress }) => {
  const theme = useContext(ThemeContext)

  return (
    <Pressable
      style={[
        styles.item,
        {
          borderBottomColor: theme.scheme === 'LIGHT' ? Color.Third : ColorDark.Third,
        },
      ]}
      onPress={onPress}
    >
      <ThemedText style={styles.itemText}>{title}</ThemedText>
    </Pressable>
  )
}
const Users: React.FC<IUsers> = props => {
  const { data } = props

  return (
    <ThemedView style={styles.menu}>
      {data?.map((e, idx) => (
        <Item
          title={e.name}
          key={e.uuid}
        />
      ))}
    </ThemedView>
  )
}

const UserSearch: React.FC = props => {
  const [text, setText] = useState('')
  const [showContent, setShowContent] = useState(true)

  const { data: searchedUser, mutate: mutateSearchUser } = useUserSearch({
    params: {
      name: text,
    },
  })

  useEffect(() => {
    mutateSearchUser().then()
  }, [text])

  return <></>
}

export default UserSearch

const styles = StyleSheet.create({
  menu: {
    width: 200,
    height: 300,
    padding: 4,
    borderRadius: 4,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  itemText: {
    fontWeight: '500',
  },
})
