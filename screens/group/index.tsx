import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useRoute } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import * as Haptics from 'expo-haptics'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import AddRecord from './add'
import ItemCard from './itemCard'
import TopCard from './topCard'
import Modal from '../../components/General/Modal'
import { Color, ColorDark } from '../../constants/Colors'
import { ThemeContext } from '../../feature/theme/themeContext'
import { MembersContext, useMembersContext } from '../../feature/user/membersContext'
import { useGroup } from '../../services/group'
import { useRecordGroup } from '../../services/record'

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
  const [showSetting, setShowSetting] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const theme = useContext(ThemeContext)
  const insets = useSafeAreaInsets()
  const { t } = useTranslation('group')
  const route = useRoute()

  const { groupId } = route.params

  const { data: groupData, mutate: mutateGroup, isLoading: groupLoading } = useGroup(groupId)
  const { data: recordData, mutate: mutateRecord, isLoading: recordLoading } = useRecordGroup(groupId)

  const membersContextValue = useMembersContext(groupData?.data?.membersInfo || [])

  useEffect(() => {
    setIsLoading(groupLoading && recordLoading)
  }, [groupLoading, recordLoading])

  useEffect(() => {
    return () => {
      mutateGroup(undefined).then()
      mutateRecord(undefined).then()
    }
  }, [])

  const handleRefresh = useCallback(() => {
    mutateGroup().then()
    mutateRecord().then()
  }, [])

  const handlePressAdd = useCallback(() => {
    setShowAddRecord(true)
    Haptics.selectionAsync().then()
  }, [])

  const handleCloseAddRecord = useCallback(() => {
    mutateGroup().then()
    mutateRecord().then()
    setShowAddRecord(false)
  }, [])
  const handleCloseShare = useCallback(() => {
    setShowShareModal(false)
  }, [])
  const handleCloseDebtDetail = useCallback(() => {
    mutateGroup().then()
    mutateRecord().then()
    setShowDebtDetail(false)
  }, [])
  const handleCloseItemDetail = useCallback(() => {
    mutateGroup().then()
    mutateRecord().then()
    setShowItemDetail(false)
  }, [])
  const handleCloseSetting = useCallback(() => {
    setShowSetting(false)
  }, [])

  const handlePressItemCard = useCallback((item: any) => {
    setShowItemDetail(true)
  }, [])
  const handlePressQrcode = useCallback(() => {
    setShowShareModal(true)
  }, [])
  const handlePressDebtDetail = useCallback(() => {
    setShowDebtDetail(true)
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
          estimatedItemSize={85}
          ListHeaderComponent={
            <View style={{ paddingTop: insets.top + 64 }}>
              <TopCard
                data={groupData?.data}
                onPressQrcode={handlePressQrcode}
                onPressDebtDetail={handlePressDebtDetail}
              />
            </View>
          }
          refreshing={isLoading}
          onRefresh={handleRefresh}
        />
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
        />
      )}
      {showSetting && (
        <Modal
          title={t('setting') + ''}
          onClose={handleCloseSetting}
        />
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
