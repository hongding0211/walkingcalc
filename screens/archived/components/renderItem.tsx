import { useNavigation } from '@react-navigation/native'
import * as Haptics from 'expo-haptics'
import React, { useCallback, useContext, useRef } from 'react'
import { Swipeable } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'

import Unarchive from './unarchive'
import ItemCard from '../../../components/ItemCard'
import useToast from '../../../components/Toast/useToast'
import { Color, ColorDark } from '../../../constants/Colors'
import { setLoading } from '../../../feature/general/generalSlice'
import { ThemeContext } from '../../../feature/theme/themeContext'
import { GroupProps } from '../../../navigation/types'
import { useUnarchiveGroup } from '../../../services/group'
import use1l8n from '../../../utlis/use1l8n'

interface IRenderItem {
  item: any
  index: number
  total: number
  onRefresh: () => void
}

const RenderItem: React.FC<IRenderItem> = props => {
  const { item, index, total, onRefresh } = props

  const swipeLock = useRef(false)

  const navigation = useNavigation<GroupProps['navigation']>()
  const theme = useContext(ThemeContext)
  const t = use1l8n('home')
  const toast = useToast()
  const dispatch = useDispatch()

  const { trigger: triggerGroupUnarchive } = useUnarchiveGroup()

  const handlePress = useCallback(() => {
    setTimeout(() => {
      if (swipeLock.current) {
        return
      }
      navigation.navigate('Group', {
        groupId: item.id,
      })
    }, 100)
  }, [])

  const handleSwipeBegin = useCallback(() => {
    swipeLock.current = false
  }, [])

  const handleSwipeEnd = useCallback(() => {
    swipeLock.current = true
  }, [])

  const handleSwipeOpen = useCallback((index: number) => {
    Haptics.selectionAsync().then()
    dispatch(
      setLoading({
        status: true,
      })
    )
    triggerGroupUnarchive({
      body: {
        id: item?.id,
      },
    })
      .then(res => {
        if (res?.success) {
          toast(t('unarchiveSuccess'))
        } else {
          toast(t('unarchiveFail'))
        }
      })
      .finally(() => {
        dispatch(
          setLoading({
            status: false,
          })
        )
        onRefresh()
      })
  }, [])

  return (
    <Swipeable
      renderLeftActions={() => (
        <Unarchive
          title={t('unarchive')}
          index={index}
          total={total}
        />
      )}
      containerStyle={{
        borderTopColor: theme.scheme === 'LIGHT' ? Color.Third : ColorDark.Third,
        borderTopWidth: index === 0 ? 0 : 1,
      }}
      onBegan={handleSwipeBegin}
      onEnded={handleSwipeEnd}
      onSwipeableOpen={() => handleSwipeOpen(index)}
    >
      <ItemCard.Item
        title={item.name}
        index={index}
        total={total}
        onPress={handlePress}
      />
    </Swipeable>
  )
}

export default RenderItem
