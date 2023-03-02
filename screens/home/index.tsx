import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, View } from 'react-native'
import { useDispatch } from 'react-redux'

import About from './about'
import Header from './header'
import styles from './style'
import Modal from '../../components/General/Modal'
import ThemedView from '../../components/General/View'
import { setToken } from '../../feature/user/userSlice'

const Home: React.FC = () => {
  const [showAddGroupModal, setShowAddGroupModal] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)

  const { t } = useTranslation('home')
  const dispatch = useDispatch()

  const handleShowAddGroupModal = useCallback(() => {
    setShowAddGroupModal(true)
  }, [])

  const handleCloseAddGroupModal = useCallback(() => {
    setShowAddGroupModal(false)
  }, [])

  const handleShowAbout = useCallback((v: boolean) => {
    setShowAboutModal(v)
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
      <ThemedView>
        <View style={styles.container}>
          <Header
            onAdd={handleShowAddGroupModal}
            onShowAbout={() => handleShowAbout(true)}
            onLogout={handleLogout}
          />
        </View>
      </ThemedView>

      {showAddGroupModal && (
        <Modal
          hideTitle
          onClose={handleCloseAddGroupModal}
        />
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
