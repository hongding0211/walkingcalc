import React, { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, SafeAreaView, View } from 'react-native'
import { useDispatch } from 'react-redux'

import About from './about'
import AddGroup from './group/add'
import CreateGroup from './group/create'
import JoinGroup from './group/join'
import Header from './header'
import styles from './style'
import Modal from '../../components/General/Modal'
import { Color, ColorDark } from '../../constants/Colors'
import { ThemeContext } from '../../feature/theme/themeContext'
import { setToken } from '../../feature/user/userSlice'

const Home: React.FC = () => {
  const [showAddGroupModal, setShowAddGroupModal] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showJoinGroup, setShowJoinGroup] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)

  const { t } = useTranslation('home')
  const dispatch = useDispatch()
  const theme = useContext(ThemeContext)

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

  const handleCreateGroup = useCallback((groupId: string) => {
    // TODO
  }, [])

  const handleJoinGroup = useCallback((groupId: string) => {
    // TODO
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
