import { debounce } from 'lodash'
import { Skeleton } from 'native-base'
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { Color, ColorDark } from '../../constants/Colors'
import { ThemeContext } from '../../feature/theme/themeContext'
import { useUserSearch } from '../../services/user'
import Input from '../General/Input'
import ThemedText from '../General/Themed/Text'
import ThemedView from '../General/Themed/View'
import useToast from '../Toast/useToast'

interface IUser {
  name?: string
  uuid?: string
  onSelect?: (uuid?: string) => void
}

const User: React.FC<IUser> = props => {
  const theme = useContext(ThemeContext)

  return (
    <Pressable onPress={() => props.onSelect && props.onSelect(props.uuid)}>
      <View style={{ paddingVertical: 8 }}>
        <ThemedText style={{ fontWeight: '500' }}>{props.name}</ThemedText>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor:
            theme.scheme === 'LIGHT' ? Color.Fourth : ColorDark.Fourth,
        }}
      />
    </Pressable>
  )
}

interface IUserSearch {
  onSelect?: (user?: any) => void
}

const UserSearch: React.FC<IUserSearch> = props => {
  const { onSelect } = props

  const [text, setText] = useState('')
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [layout, setLayout] = useState({
    width: 0,
    top: 0,
  })
  const [showSearchContent, setShowSearchContent] = useState(false)

  const textRef = useRef('')

  const { t } = useTranslation('group')
  const theme = useContext(ThemeContext)
  const toast = useToast()

  const { trigger: triggerUserSearch } = useUserSearch()

  const handleChangeText = useCallback((text: string) => {
    setText(text)
    textRef.current = text
  }, [])

  const debouncedMutateSearchUser = useCallback(
    debounce(() => {
      triggerUserSearch({
        params: {
          name: textRef.current,
        },
      })
        .then(res => {
          if (res?.success && res?.data) {
            setUsers(res.data)
          }
        })
        .catch(() => {
          toast(t('generalError') + '')
        })
        .finally(() => {
          setLoading(false)
        })
    }, 300),
    []
  )

  const handleSelect = useCallback(
    (uuid?: string) => {
      onSelect && onSelect(users.find(e => e.uuid === uuid))
      setText('')
    },
    [users]
  )

  const handleInputLayout = useCallback((e: any) => {
    const { layout } = e?.nativeEvent
    if (!layout) {
      return
    }
    setLayout({
      width: layout?.width,
      top: layout?.height + 4,
    })
  }, [])

  useEffect(() => {
    if (text.length === 0) {
      setUsers([])
      setShowSearchContent(false)
      return
    }
    setShowSearchContent(true)
    setLoading(true)
    debouncedMutateSearchUser()
  }, [text])

  useEffect(() => {
    if (!loading && users.length < 1) {
      setShowSearchContent(false)
    }
  }, [loading, users])

  return (
    <>
      <Input
        value={text}
        onChangeText={handleChangeText}
        placeholder={t('searchByName') + ''}
        onLayout={handleInputLayout}
      />
      {showSearchContent && (
        <>
          <ThemedView
            style={[
              {
                ...layout,
              },
              {
                borderColor:
                  theme.scheme === 'LIGHT' ? Color.Third : ColorDark.Third,
              },
              styles.container,
            ]}
          >
            <ScrollView style={styles.list}>
              {loading && (
                <Skeleton.Text
                  lines={3}
                  py={2}
                  startColor={
                    theme.scheme === 'LIGHT' ? 'muted.200' : 'muted.800'
                  }
                />
              )}
              {!loading &&
                users.map(u => (
                  <User
                    key={u?.uuid + u?.name}
                    name={u.name}
                    uuid={u?.uuid}
                    onSelect={handleSelect}
                  />
                ))}
            </ScrollView>
          </ThemedView>
        </>
      )}
    </>
  )
}

export default UserSearch

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  list: {
    maxHeight: 200,
    paddingHorizontal: 4,
  },
})
