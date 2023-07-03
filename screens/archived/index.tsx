import { FlashList } from '@shopify/flash-list'
import React, { useCallback, useContext, useEffect, useMemo } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'

import RenderItem from './components/renderItem'
import { useAppSelector } from '../../app/store'
import ItemCard from '../../components/ItemCard'
import { Color, ColorDark } from '../../constants/Colors'
import { setLoading } from '../../feature/general/generalSlice'
import { ThemeContext } from '../../feature/theme/themeContext'
import { useGroupMy } from '../../services/group'

const Archived: React.FC = () => {
  const insets = useSafeAreaInsets()
  const theme = useContext(ThemeContext)
  const userInfo = useAppSelector(state => state.user.data)
  const dispatch = useDispatch()

  const { data: groupData, mutate: mutateGroup, isLoading: groupLoading } = useGroupMy()

  const archivedGroupData = useMemo(() => {
    const { uuid = '' } = userInfo || {}
    return {
      data: groupData?.data?.filter(e => e?.archivedUsers?.findIndex(e => e === uuid) !== -1),
    }
  }, [groupData, userInfo])

  const handleRefresh = useCallback(() => {
    mutateGroup().then()
  }, [])

  useEffect(() => {
    dispatch(
      setLoading({
        status: groupLoading,
      })
    )
  }, [groupLoading])

  if (!archivedGroupData.data?.length) {
    return null
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top + 42,
        paddingBottom: insets.bottom,
        backgroundColor: theme.scheme === 'LIGHT' ? Color.BackgroundSecond : ColorDark.BackgroundSecond,
      }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <ItemCard.Container key={archivedGroupData.data?.length}>
          {archivedGroupData?.data &&
            archivedGroupData.data.map((item, index) => (
              <RenderItem
                key={item.id}
                item={item}
                index={index}
                total={archivedGroupData?.data?.length || 0}
                onRefresh={handleRefresh}
              />
            ))}
        </ItemCard.Container>
      </ScrollView>
    </View>
  )
}

export default Archived

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginTop: 20,
    rowGap: 20,
  },
  delText: {
    textAlign: 'center',
    color: Color.Danger,
    fontWeight: '500',
  },
})
