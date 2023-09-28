import { useNavigation } from '@react-navigation/native'
import * as Haptics from 'expo-haptics'
import React, { useCallback, useRef } from 'react'
import { Swipeable } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'

import Unarchive from './unarchive'
import { useAppSelector } from '../../../app/store'
import ThemedText from '../../../components/General/Themed/Text'
import ItemCard from '../../../components/ItemCard'
import useToast from '../../../components/Toast/useToast'
import { setLoading } from '../../../feature/general/generalSlice'
import { GroupProps } from '../../../navigation/types'
import { useUnarchiveGroup } from '../../../services/group'
import { numberToString } from '../../../utils/moeny'
import use1l8n from '../../../utils/use1l8n'

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
  const t = use1l8n('home')
  const toast = useToast()
  const dispatch = useDispatch()

  const { trigger: triggerGroupUnarchive } = useUnarchiveGroup()

  const userInfo = useAppSelector(state => state.user.data)
  const debt = item?.membersInfo.find((e: any) => e.uuid === userInfo?.uuid)?.debt

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

  const handleSwipeActivated = useCallback(() => {
    Haptics.selectionAsync().then()
  }, [])

  const handleSwipeBegin = useCallback(() => {
    swipeLock.current = false
  }, [])

  const handleSwipeEnd = useCallback(() => {
    swipeLock.current = true
  }, [])

  const handleSwipeOpen = useCallback((index: number) => {
    Haptics.notificationAsync().then()
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
      onActivated={handleSwipeActivated}
      onBegan={handleSwipeBegin}
      onEnded={handleSwipeEnd}
      onSwipeableOpen={() => handleSwipeOpen(index)}
    >
      <ItemCard.Item
        title={item.name}
        index={index}
        total={total}
        onPress={handlePress}
        rightComponent={<ThemedText type="SECOND">{(debt < -1e-10 ? '' : '+') + numberToString(debt)}</ThemedText>}
      />
    </Swipeable>
  )
}

export default RenderItem
