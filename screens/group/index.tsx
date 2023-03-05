import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import * as Haptics from 'expo-haptics'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Dimensions, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import AddRecord from './add'
import AddMember from './addMember'
import ItemCard from './itemCard'
import ItemCardSkeleton from './itemCard/itemCardSkeleton'
import ItemDetail from './itemDetail'
import GroupSetting from './setting'
import TopCard from './topCard'
import TopCardSkeleton from './topCardSkeleton'
import Modal from '../../components/General/Modal'
import useToast from '../../components/Toast/useToast'
import { Color, ColorDark } from '../../constants/Colors'
import { ThemeContext } from '../../feature/theme/themeContext'
import { MembersContext, useMembersContext } from '../../feature/user/membersContext'
import { useAddTempUser, useDeleteGroup, useGroup, useGroupInvite } from '../../services/group'
import { useDropRecord, useRecordGroup } from '../../services/record'

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
  const [showShareModal, setShowShareModal] = useState(false)
  const [showDebtDetail, setShowDebtDetail] = useState(false)
  const [showItemDetail, setShowItemDetail] = useState(false)
  const [showAddMember, setShowAddMember] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const theme = useContext(ThemeContext)
  const insets = useSafeAreaInsets()
  const { t } = useTranslation('group')
  const route = useRoute()
  const navigation = useNavigation<any>()
  const toast = useToast()

  const { groupId, showSetting } = route.params

  const { data: groupData, mutate: mutateGroup, isLoading: groupLoading } = useGroup(groupId)
  const { data: recordData, mutate: mutateRecord, isLoading: recordLoading } = useRecordGroup(groupId)

  const { trigger: triggerDropRecord } = useDropRecord()
  const { trigger: triggerDismissGroup } = useDeleteGroup()
  const { trigger: triggerInvite } = useGroupInvite()
  const { trigger: triggerAddTempUser } = useAddTempUser()

  const membersContextValue = useMembersContext(groupData?.data)

  useEffect(() => {
    setIsLoading(groupLoading && recordLoading)
  }, [groupLoading, recordLoading])

  useEffect(() => {
    return () => {
      mutateGroup(undefined).then()
      mutateRecord(undefined).then()
    }
  }, [])

  const refreshData = useCallback(() => {
    mutateGroup().then()
    mutateRecord().then()
  }, [])

  const handleRefresh = useCallback(() => {
    refreshData()
  }, [])

  const deleteRecord = useCallback(() => {
    if (!selectedItem || !groupId || !selectedItem.recordId) {
      toast(t('delFail') + '')
      return
    }
    triggerDropRecord({
      body: {
        groupId,
        recordId: selectedItem.recordId,
      },
    })
      .then(() => {
        refreshData()
        setShowItemDetail(false)
      })
      .catch(() => {
        toast(t('delFail') + '')
      })
  }, [groupId, selectedItem])

  const dismissGroup = useCallback(() => {
    if (!groupId) {
      toast(t('dismissFail') + '')
      return
    }
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
  }, [groupId, selectedItem])

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

  const handleConfirmAddUser = useCallback((data?: { user?: any; tempUser?: any }) => {
    if (!groupId || !data || !data.user || !data.tempUser) {
      return
    }
    Promise.all([
      triggerInvite({
        body: {
          id: groupId,
          members: data.user?.map(u => u.uuid) || [],
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
      })
  }, [])

  const handlePressAdd = useCallback(() => {
    setShowAddRecord(true)
    Haptics.selectionAsync().then()
  }, [])

  const handleCloseAddRecord = useCallback(() => {
    refreshData()
    setShowAddRecord(false)
  }, [])
  const handleCloseShare = useCallback(() => {
    setShowShareModal(false)
  }, [])
  const handleCloseDebtDetail = useCallback(() => {
    refreshData()
    setShowDebtDetail(false)
  }, [])
  const handleCloseItemDetail = useCallback(() => {
    refreshData()
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
        {!recordData?.data && (
          <View style={{ rowGap: 10 }}>
            <TopCardSkeleton />
            <ItemCardSkeleton />
          </View>
        )}
        {recordData?.data && (
          <FlashList
            data={recordData?.data}
            renderItem={({ item }) => (
              <Pressable
                style={styles.item}
                onPress={() => handlePressItemCard(item)}
              >
                <ItemCard data={item} />
              </Pressable>
            )}
            estimatedItemSize={80}
            ListHeaderComponent={
              <View style={{ paddingTop: insets.top + 64 }}>
                <TopCard
                  data={groupData?.data}
                  onPressQrcode={handlePressQrcode}
                  onPressDebtDetail={handlePressDebtDetail}
                  onAddMember={handleAddMember}
                />
              </View>
            }
            refreshing={isLoading}
            onRefresh={handleRefresh}
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
            onAdd={handleCloseAddRecord}
          />
        </Modal>
      )}
      {showShareModal && (
        <Modal
          title={t('share') + ''}
          onClose={handleCloseShare}
        />
      )}
      {showDebtDetail && (
        <Modal
          title={t('debtDetail') + ''}
          onClose={handleCloseDebtDetail}
        />
      )}
      {showItemDetail && (
        <Modal
          title={t('recordDetail') + ''}
          onClose={handleCloseItemDetail}
        >
          <ItemDetail
            data={selectedItem}
            onDelete={handleDeleteRecord}
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
            recordCnt={recordData?.data?.length}
            onDismiss={handleDismissGroup}
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
})
