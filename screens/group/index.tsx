import { faL, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import * as Haptics from 'expo-haptics'
import { Spinner } from 'native-base'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Dimensions, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'

import AddRecord from './add'
import EditRecord from './add/edit'
import AddMember from './addMember'
import DebtDetail from './debtDetail'
import ItemCard from './itemCard'
import ItemCardSkeleton from './itemCard/itemCardSkeleton'
import ItemDetail from './itemDetail'
import GroupSetting from './setting'
import Share from './share'
import TopCard from './topCard'
import TopCardSkeleton from './topCardSkeleton'
import Modal from '../../components/General/Modal'
import ThemedText from '../../components/General/Themed/Text'
import useToast from '../../components/Toast/useToast'
import { Color, ColorDark } from '../../constants/Colors'
import { setLoading } from '../../feature/general/generalSlice'
import { ThemeContext } from '../../feature/theme/themeContext'
import { MembersContext, useMembersContext } from '../../feature/user/membersContext'
import { GroupProps } from '../../navigation/types'
import { useAddTempUser, useDeleteGroup, useGroup, useGroupInvite } from '../../services/group'
import { useAddRecord, useDropRecord, useRecordById, useRecordGroup } from '../../services/record'
import { IResolvedDebt } from '../../utils/debt'
import { useDate } from '../../utils/useDate'

const Loading = () => {
  return (
    <Spinner
      size="sm"
      color="muted.300"
    />
  )
}

const AddButton: React.FC<{ onPress?: () => void }> = ({ onPress }) => (
  <Pressable
    style={styles.addBtn}
    onPress={onPress}
  >
    <FontAwesomeIcon
      icon={faPlus}
      size={28}
      style={{ color: '#fff' }}
    />
  </Pressable>
)

const GroupHome: React.FC = () => {
  const [showAddRecord, setShowAddRecord] = useState(false)
  const [showEditRecord, setShowEditRecord] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showDebtDetail, setShowDebtDetail] = useState(false)
  const [showItemDetail, setShowItemDetail] = useState(false)
  const [showAddMember, setShowAddMember] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [listData, setListData] = useState<any>(undefined)
  const [recordLoading, setRecordLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const scrollRef = useRef(false)
  const flashListRef = useRef<any>(undefined)

  const theme = useContext(ThemeContext)
  const insets = useSafeAreaInsets()
  const { t } = useTranslation('group')
  const route = useRoute<GroupProps['route']>()
  const navigation = useNavigation<GroupProps['navigation']>()
  const toast = useToast()
  const dispatch = useDispatch()
  const { fullDate } = useDate()

  const { groupId, showSetting } = route.params || {}

  const { data: groupData, mutate: mutateGroup, isLoading: groupLoading } = useGroup(groupId)
  const { trigger: triggerRecord } = useRecordGroup()
  const { trigger: triggerAddRecord } = useAddRecord()
  const { trigger: triggerDropRecord } = useDropRecord()
  const { trigger: triggerDismissGroup } = useDeleteGroup()
  const { trigger: triggerInvite } = useGroupInvite()
  const { trigger: triggerAddTempUser } = useAddTempUser()
  const { trigger: triggerGetRecordById } = useRecordById()

  const membersContextValue = useMembersContext(groupData?.data)

  useEffect(() => {
    setIsLoading(groupLoading || recordLoading)
  }, [groupLoading, recordLoading])

  useEffect(() => {
    return () => {
      mutateGroup(undefined).then()
      setListData([])
    }
  }, [])

  useEffect(() => {
    if (!groupId) {
      return
    }
    setRecordLoading(true)
    triggerRecord({
      params: {
        id: groupId,
        page: page + '',
      },
    })
      .then(v => {
        if (v?.success && v?.data && v?.pagination?.total != null) {
          setListData(v.data)
          setTotal(v.pagination.total)
        }
      })
      .catch(() => {
        toast(t('generalError') + '')
      })
      .finally(() => {
        setRecordLoading(false)
      })
  }, [groupId])

  useEffect(() => {
    const timer = setInterval(refreshData, 30000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const refreshData = useCallback(() => {
    mutateGroup().then()
    triggerRecord({
      params: {
        id: groupId,
        page: 1 + '',
      },
    })
      .then(v => {
        if (v?.data && v?.pagination) {
          setListData(v.data)
          setTotal(v.pagination.total)
        }
      })
      .catch(() => {
        toast(t('generalError') + '')
      })
    setPage(1)
  }, [])

  const handleRefresh = useCallback(() => {
    refreshData()
  }, [])

  const scrollToTop = useCallback(() => {
    flashListRef.current.scrollToOffset({
      animated: true,
      offset: 0,
    })
  }, [])

  const handleReachEnd = useCallback(() => {
    const totalPage = Math.ceil(total / 10)
    if (page >= totalPage) {
      return
    }
    if (isLoading) {
      return
    }
    if (!scrollRef.current) {
      return
    }
    scrollRef.current = false
    setPage(page + 1)
    setRecordLoading(true)
    triggerRecord({
      params: {
        id: groupId,
        page: page + 1 + '',
      },
    })
      .then(v => {
        if (v?.success && v?.data && v?.pagination?.total != null) {
          setListData([...(listData || []), ...v.data])
          setTotal(v.pagination.total)
        }
      })
      .catch(() => {
        toast(t('generalError') + '')
      })
      .finally(() => {
        setRecordLoading(false)
      })
  }, [isLoading, listData, total, page])

  const deleteRecord = useCallback(() => {
    if (!selectedItem || !groupId || !selectedItem.recordId) {
      toast(t('delFail') + '')
      return
    }
    dispatch(
      setLoading({
        status: true,
      })
    )
    triggerDropRecord({
      body: {
        groupId,
        recordId: selectedItem.recordId,
      },
    })
      .then(res => {
        if (res?.success) {
          const idx = listData.findIndex((e: any) => e.recordId === selectedItem.recordId)
          if (idx !== -1) {
            setListData([...listData.slice(0, idx), ...listData.slice(idx + 1)])
            setTotal(listData.length - 1)
            setShowItemDetail(false)
            return
          }
        }
        refreshData()
        scrollToTop()
        setShowItemDetail(false)
      })
      .catch(() => {
        toast(t('delFail') + '')
      })
      .finally(() => {
        dispatch(
          setLoading({
            status: false,
          })
        )
      })
  }, [groupId, selectedItem, listData])

  const dismissGroup = useCallback(() => {
    if (!groupId) {
      toast(t('dismissFail') + '')
      return
    }
    dispatch(
      setLoading({
        status: true,
      })
    )
    triggerDismissGroup({
      params: {
        id: groupId,
      },
    })
      .then(() => {
        navigation.goBack()
      })
      .catch(() => {
        toast(t('dismissFail') + '')
      })
      .finally(() => {
        dispatch(
          setLoading({
            status: false,
          })
        )
      })
  }, [groupId])

  const handleDeleteRecord = useCallback(() => {
    Alert.alert(t('confirmDelete'), '', [
      {
        text: t('cancel') + '',
        style: 'cancel',
      },
      {
        text: t('confirm') + '',
        onPress: deleteRecord,
      },
    ])
  }, [groupId, selectedItem, listData])

  const handleClickEditRecord = useCallback(() => {
    setShowItemDetail(false)
    setShowEditRecord(true)
  }, [])

  const handleDismissGroup = useCallback(() => {
    Alert.alert(t('confirmDismiss'), '', [
      {
        text: t('cancel') + '',
        style: 'cancel',
      },
      {
        text: t('confirm') + '',
        onPress: dismissGroup,
      },
    ])
  }, [groupId])

  const handleNameChanged = useCallback(() => {
    mutateGroup().then()
  }, [])

  const handleConfirmAddUser = useCallback((data?: { user?: any; tempUser?: any }) => {
    if (!groupId || !data || !data.user || !data.tempUser) {
      return
    }
    dispatch(
      setLoading({
        status: true,
      })
    )
    Promise.all([
      triggerInvite({
        body: {
          id: groupId,
          members: data.user?.map((u: any) => u.uuid) || [],
        },
      }),
      ...data.tempUser.map((t: string) =>
        triggerAddTempUser({
          body: {
            id: groupId,
            name: t,
          },
        })
      ),
    ])
      .catch(() => {
        toast(t('generalError') + '')
      })
      .finally(() => {
        setShowAddMember(false)
        refreshData()
        dispatch(
          setLoading({
            status: false,
          })
        )
      })
  }, [])

  const resolveDebt = useCallback((debtToBeResolved: IResolvedDebt[]) => {
    if (debtToBeResolved.length < 1) {
      toast(t('zeroDebt') + '')
      return
    }
    dispatch(
      setLoading({
        status: true,
      })
    )
    Promise.all(
      debtToBeResolved.map(d => {
        return triggerAddRecord({
          body: {
            groupId,
            who: d.from?.uuid || '',
            paid: d.amount,
            forWhom: [d.to?.uuid || ''],
            type: 'debtResolve',
            text: t('debtResolveMark'),
            long: '',
            lat: '',
            isDebtResolve: true,
          },
        })
      })
    )
      .then(() => {
        setShowDebtDetail(false)
      })
      .catch(() => {
        toast(t('generalError') + '')
      })
      .finally(() => {
        dispatch(
          setLoading({
            status: false,
          })
        )
        refreshData()
        scrollToTop()
      })
  }, [])

  const resolveSingleDebt = useCallback((debtToBeResolved: IResolvedDebt) => {
    dispatch(
      setLoading({
        status: true,
      })
    )
    triggerAddRecord({
      body: {
        groupId,
        who: debtToBeResolved.from?.uuid || '',
        paid: debtToBeResolved.amount,
        forWhom: [debtToBeResolved.to?.uuid || ''],
        type: 'debtResolve',
        text: t('debtResolveMark'),
        long: '',
        lat: '',
        isDebtResolve: true,
      },
    })
      .then(() => {
        toast(t('resolveSingleSuccess') + '')
      })
      .catch(() => {
        toast(t('generalError') + '')
      })
      .finally(() => {
        dispatch(
          setLoading({
            status: false,
          })
        )
        refreshData()
      })
  }, [])

  const handleResolveDebt = useCallback((debt: IResolvedDebt[]) => {
    Alert.alert(t('confirmResolve'), '', [
      {
        text: t('cancel') + '',
        style: 'cancel',
      },
      {
        text: t('confirm') + '',
        onPress: () => resolveDebt(debt),
      },
    ])
  }, [])

  const handleResolveSingleDebt = useCallback((debt: IResolvedDebt) => {
    Alert.alert(t('confirmResolveSingle'), '', [
      {
        text: t('cancel') + '',
        style: 'cancel',
      },
      {
        text: t('confirm') + '',
        onPress: () => resolveSingleDebt(debt),
      },
    ])
  }, [])

  const handleScroll = useCallback(() => (scrollRef.current = true), [])

  const handlePressAdd = useCallback(() => {
    setShowAddRecord(true)
    Haptics.selectionAsync().then()
  }, [])

  const handleAddRecord = useCallback(() => {
    refreshData()
    scrollToTop()
    handleCloseAddRecord()
  }, [])

  const handleEditRecord = useCallback(() => {
    handleCloseEditRecord()
    setLoading({
      status: true,
    })
    const id = selectedItem.recordId
    triggerGetRecordById({
      params: {
        id,
      },
    })
      .then(res => {
        if (res?.success) {
          const idx = listData.findIndex(e => e.recordId === id)
          if (idx !== -1) {
            setListData([...listData.slice(0, idx), res.data, ...listData.slice(idx + 1)])
          } else {
            throw new Error()
          }
        } else {
          throw new Error()
        }
      })
      .catch(() => {
        refreshData()
        scrollToTop()
      })
      .finally(() => {
        setLoading({
          status: false,
        })
      })
  }, [selectedItem, listData])

  const handleCloseAddRecord = useCallback(() => {
    setShowAddRecord(false)
  }, [])
  const handleCloseEditRecord = useCallback(() => {
    setShowEditRecord(false)
  }, [])
  const handleCloseShare = useCallback(() => {
    setShowShareModal(false)
  }, [])
  const handleCloseDebtDetail = useCallback(() => {
    refreshData()
    scrollToTop()
    setShowDebtDetail(false)
  }, [])
  const handleCloseItemDetail = useCallback(() => {
    setShowItemDetail(false)
  }, [])
  const handleCloseSetting = useCallback(() => {
    navigation.setParams({
      showSetting: undefined,
    })
  }, [])
  const handleCloseAddMember = useCallback(() => {
    setShowAddMember(false)
  }, [])

  const handlePressItemCard = useCallback((item: any) => {
    setSelectedItem(item)
    setShowItemDetail(true)
  }, [])
  const handlePressQrcode = useCallback(() => {
    setShowShareModal(true)
  }, [])
  const handlePressDebtDetail = useCallback(() => {
    setShowDebtDetail(true)
  }, [])
  const handleAddMember = useCallback(() => {
    setShowAddMember(true)
  }, [])

  const sectionedListData = useMemo(() => {
    let lastDay: number | undefined = undefined
    return listData?.map((i: any) => {
      const currentDay = Math.floor(i.modifiedAt / (1000 * 60 * 60 * 24))
      const sectionHead = lastDay !== currentDay
      lastDay = currentDay
      return {
        ...i,
        sectionHead,
      }
    })
  }, [listData])

  if (groupId === undefined) {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    })
    navigation.popToTop()
    return null
  }

  return (
    <MembersContext.Provider value={membersContextValue}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.scheme === 'LIGHT' ? Color.BackgroundSecond : ColorDark.BackgroundSecond,
          },
        ]}
      >
        <AddButton onPress={handlePressAdd} />
        {(listData === undefined || !groupData?.data) && (
          <View style={{ rowGap: 10 }}>
            <TopCardSkeleton />
            <ItemCardSkeleton />
          </View>
        )}
        {listData !== undefined && groupData?.data && (
          <FlashList
            data={sectionedListData}
            renderItem={(e: any) => (
              <>
                {e.item.sectionHead && (
                  <ThemedText
                    style={styles.sectionHeader}
                    type="SECOND"
                  >
                    {fullDate(e.item.modifiedAt)}
                  </ThemedText>
                )}
                <Pressable
                  style={styles.item}
                  onPress={() => handlePressItemCard(e.item)}
                >
                  <ItemCard data={e.item} />
                </Pressable>
              </>
            )}
            estimatedItemSize={80}
            ListHeaderComponentStyle={{
              paddingTop: insets.top + 64,
            }}
            ListHeaderComponent={
              <TopCard
                data={groupData?.data}
                onPressQrcode={handlePressQrcode}
                onPressDebtDetail={handlePressDebtDetail}
                onAddMember={handleAddMember}
              />
            }
            ListFooterComponent={
              <>
                {isLoading && <Loading />}
                {!isLoading && page === Math.ceil(total / 10) && (
                  <ThemedText
                    style={{ fontSize: 12 }}
                    type="SECOND"
                  >
                    - {t('end')} -
                  </ThemedText>
                )}
              </>
            }
            ListFooterComponentStyle={{
              alignSelf: 'center',
              paddingTop: 12,
              paddingBottom: 32,
            }}
            refreshing={isLoading}
            onRefresh={handleRefresh}
            onEndReached={handleReachEnd}
            onScrollBeginDrag={handleScroll}
            showsVerticalScrollIndicator={false}
            ref={flashListRef}
          />
        )}
      </View>

      {showAddRecord && (
        <Modal
          title={t('addRecord') + ''}
          onClose={handleCloseAddRecord}
        >
          <AddRecord
            groupId={groupId}
            onAdd={handleAddRecord}
          />
        </Modal>
      )}
      {showEditRecord && (
        <Modal
          title={t('editRecord') + ''}
          onClose={handleCloseEditRecord}
        >
          <EditRecord
            groupId={groupId}
            data={selectedItem}
            onEdit={handleEditRecord}
          />
        </Modal>
      )}
      {showShareModal && (
        <Modal
          title={t('share') + ''}
          onClose={handleCloseShare}
        >
          <Share groupId={groupId} />
        </Modal>
      )}
      {showDebtDetail && (
        <Modal
          title={t('debtDetail') + ''}
          onClose={handleCloseDebtDetail}
        >
          <DebtDetail
            data={groupData?.data}
            onResolveDebt={handleResolveDebt}
            onResolveSingleDebt={handleResolveSingleDebt}
          />
        </Modal>
      )}
      {showItemDetail && (
        <Modal
          title={t('recordDetail') + ''}
          onClose={handleCloseItemDetail}
        >
          <ItemDetail
            data={selectedItem}
            onDelete={handleDeleteRecord}
            onEdit={handleClickEditRecord}
          />
        </Modal>
      )}
      {showSetting && (
        <Modal
          title={t('setting') + ''}
          onClose={handleCloseSetting}
        >
          <GroupSetting
            data={groupData?.data}
            recordCnt={total}
            onDismiss={handleDismissGroup}
            onChangeName={handleNameChanged}
          />
        </Modal>
      )}
      {showAddMember && (
        <Modal
          title={t('addMember') + ''}
          onClose={handleCloseAddMember}
        >
          <AddMember
            groupData={groupData?.data}
            onConfirm={handleConfirmAddUser}
          />
        </Modal>
      )}
    </MembersContext.Provider>
  )
}

export default GroupHome

const styles = StyleSheet.create({
  addBtn: {
    height: 60,
    width: 60,
    borderRadius: 99999,
    backgroundColor: Color.Primary,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    bottom: 40,
  },
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
  },
  item: {
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: 12,
    marginLeft: 8,
    marginTop: 8,
  },
})
