import React, { useCallback, useState } from 'react'
import { View } from 'react-native'

import Header from './header'
import styles from './style'
import Modal from '../../components/General/Modal'
import ThemedView from '../../components/General/View'

const Home: React.FC = () => {
  const [showAddGroupModal, setShowAddGroupModal] = useState(false)

  const handleShowAddGroupModal = useCallback(() => {
    setShowAddGroupModal(true)
  }, [])

  const handleCloseAddGroupModal = useCallback(() => {
    setShowAddGroupModal(false)
  }, [])

  return (
    <ThemedView>
      <View style={styles.container}>
        <Header onAdd={handleShowAddGroupModal} />
      </View>

      {showAddGroupModal && (
        <Modal
          title="Title"
          onClose={handleCloseAddGroupModal}
        />
      )}
    </ThemedView>
  )
}

export default Home
