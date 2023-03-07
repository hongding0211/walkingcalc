import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, SafeAreaView, View } from 'react-native'
import { useDispatch } from 'react-redux'

import About from './about'
import AddGroup from './group/add'
import CreateGroup from './group/create'
import JoinGroup from './group/join'
import Header from './header'
import Main from './main'
import styles from './style'
import Modal from '../../components/General/Modal'
import useToast from '../../components/Toast/useToast'
import { Color, ColorDark } from '../../constants/Colors'
import { ThemeContext } from '../../feature/theme/themeContext'
import { setToken } from '../../feature/user/userSlice'
import { HomeProps } from '../../navigation/types'
import { useGroupCreate, useGroupJoin, useGroupMy } from '../../services/group'
import { useUserDebt } from '../../services/user'

const Home: React.FC = () => {
  const [showAddGroupModal, setShowAddGroupModal] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [addGroupComponent, setAddGroupComponent] = useState<'DEFAULT' | 'CREATE' | 'JOIN'>('DEFAULT')

  const { t } = useTranslation('home')
  const dispatch = useDispatch()
  const theme = useContext(ThemeContext)
  const toast = useToast()
  const navigation = useNavigation<HomeProps['navigation']>()

  const { trigger: triggerGroupCreate } = useGroupCreate()
  const { trigger: triggerGroupJoin } = useGroupJoin()

  const { data: userDebt, mutate: mutateUserDebt, isLoading: userDebtLoading } = useUserDebt()
  const { data: groupData, mutate: mutateGroup, isLoading: groupLoading } = useGroupMy()

  useEffect(() => {
    setIsLoading(userDebtLoading && groupLoading)
  }, [userDebtLoading, groupLoading])

  useEffect(() => {
    return navigation.addListener('focus', () => {
      mutateUserDebt().then()
      mutateGroup().then()
    })
  }, [navigation])

  const handleCloseAddGroupModal = useCallback(() => {
    setAddGroupComponent('DEFAULT')
    setShowAddGroupModal(false)
  }, [])

  const handleShowAbout = useCallback((v: boolean) => {
    setShowAboutModal(v)
  }, [])

  const handleCreateGroup = useCallback((groupName: string) => {
    triggerGroupCreate({
      body: {
        name: groupName,
      },
    })
      .then(v => {
        if (v?.success) {
          handleCloseAddGroupModal()
        } else {
          toast(t('createFail') + '')
        }
      })
      .finally(() => {
        mutateUserDebt().then()
        mutateGroup().then()
      })
  }, [])

  const handleJoinGroup = useCallback((groupId: string) => {
    triggerGroupJoin({
      body: {
        id: groupId,
      },
    })
      .then(v => {
        if (v?.success) {
          handleCloseAddGroupModal()
        } else {
          toast(t('joinFail') + '')
        }
      })
      .finally(() => {
        mutateUserDebt().then()
        mutateGroup().then()
      })
  }, [])

  const handleLogout = useCallback(() => {
    Alert.alert(t('confirmLogout'), '', [
      {
        text: t('cancel') + '',
        style: 'cancel',
      },
      {
        text: t('confirm') + '',
        onPress: () => {
          dispatch(
            setToken({
              token: undefined,
            })
          )
        },
      },
    ])
  }, [])

  const handleRefresh = useCallback(() => {
    mutateUserDebt().then()
    mutateGroup().then()
  }, [])

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: theme.scheme === 'LIGHT' ? Color.BackgroundSecond : ColorDark.BackgroundSecond,
          flex: 1,
        }}
      >
        <View style={styles.container}>
          <Header
            onAdd={() => setShowAddGroupModal(true)}
            onShowAbout={() => handleShowAbout(true)}
            onLogout={handleLogout}
          />

          <Main
            userDebt={userDebt}
            groupData={groupData}
            loading={isLoading}
            onRefresh={handleRefresh}
          />
        </View>
      </SafeAreaView>

      {showAddGroupModal && (
        <Modal
          hideTitle={addGroupComponent === 'DEFAULT'}
          title={addGroupComponent === 'CREATE' ? t('createGroup') + '' : t('joinGroup') + ''}
          onClose={handleCloseAddGroupModal}
        >
          {addGroupComponent === 'DEFAULT' && (
            <AddGroup
              onCreateGroup={() => setAddGroupComponent('CREATE')}
              onJoinGroup={() => setAddGroupComponent('JOIN')}
            />
          )}
          {addGroupComponent === 'CREATE' && <CreateGroup onConfirm={handleCreateGroup} />}
          {addGroupComponent === 'JOIN' && <JoinGroup onConfirm={handleJoinGroup} />}
        </Modal>
      )}

      {showAboutModal && (
        <Modal
          title={t('about') + ''}
          onClose={() => handleShowAbout(false)}
        >
          <About />
        </Modal>
      )}
    </>
  )
}

export default Home
