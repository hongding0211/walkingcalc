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
import { useGroupCreate, useGroupJoin, useGroupMy } from '../../services/group'
import { useUserDebt } from '../../services/user'

const Home: React.FC = () => {
  const [showAddGroupModal, setShowAddGroupModal] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showJoinGroup, setShowJoinGroup] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation('home')
  const dispatch = useDispatch()
  const theme = useContext(ThemeContext)
  const toast = useToast()
  const navigation = useNavigation()

  const { trigger: triggerGroupCreate } = useGroupCreate()
  const { trigger: triggerGroupJoin } = useGroupJoin()

  const { data: userDebt, mutate: mutateUserDebt, isLoading: userDebtLoading } = useUserDebt()
  const { data: groupData, mutate: mutateGroup, isLoading: groupLoading } = useGroupMy()

  useEffect(() => {
    setIsLoading(userDebtLoading && groupLoading)
  }, [userDebtLoading, groupLoading])

  useEffect(() => {
    return navigation.addListener('focus', () => {
      console.log('!!👉 index.tsx: 47')
      mutateUserDebt().then()
      mutateGroup().then()
    })
  }, [navigation])

  const handleShowAddGroupModal = useCallback(() => {
    setShowAddGroupModal(true)
  }, [])

  const handleCloseAddGroupModal = useCallback(() => {
    setShowAddGroupModal(false)
  }, [])

  const handleShowAbout = useCallback((v: boolean) => {
    setShowAboutModal(v)
  }, [])

  const handleShowCreateGroup = useCallback((v: boolean) => {
    setShowAddGroupModal(false)
    setShowCreateGroup(v)
  }, [])

  const handleShowJoinGroup = useCallback((v: boolean) => {
    setShowAddGroupModal(false)
    setShowJoinGroup(v)
  }, [])

  const handleCreateGroup = useCallback((groupName: string) => {
    triggerGroupCreate({
      body: {
        name: groupName,
      },
    })
      .then(v => {
        if (v?.success) {
          setShowCreateGroup(false)
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
          setShowJoinGroup(false)
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
            onAdd={handleShowAddGroupModal}
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
          hideTitle
          onClose={handleCloseAddGroupModal}
        >
          <AddGroup
            onCreateGroup={() => handleShowCreateGroup(true)}
            onJoinGroup={() => handleShowJoinGroup(true)}
          />
        </Modal>
      )}
      {showCreateGroup && (
        <Modal
          title={t('createGroup') + ''}
          onClose={() => handleShowCreateGroup(false)}
        >
          <CreateGroup onConfirm={handleCreateGroup} />
        </Modal>
      )}
      {showJoinGroup && (
        <Modal
          title={t('joinGroup') + ''}
          onClose={() => handleShowJoinGroup(false)}
        >
          <JoinGroup onConfirm={handleJoinGroup} />
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
