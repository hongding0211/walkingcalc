import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, View } from 'react-native'
import { useDispatch } from 'react-redux'

import About from './about'
import AddGroup from './group/add'
import CreateGroup from './group/create'
import JoinGroup from './group/join'
import Header from './header'
import Main from './main'
import styles from './style'
import { useAppSelector } from '../../app/store'
import Modal from '../../components/General/Modal'
import useToast from '../../components/Toast/useToast'
import { Color, ColorDark } from '../../constants/Colors'
import { setLoading } from '../../feature/general/generalSlice'
import { ThemeContext } from '../../feature/theme/themeContext'
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
  const userInfo = useAppSelector(state => state.user.data)

  const { trigger: triggerGroupCreate } = useGroupCreate()
  const { trigger: triggerGroupJoin } = useGroupJoin()

  const { data: userDebt, mutate: mutateUserDebt, isLoading: userDebtLoading } = useUserDebt()
  const { data: groupData, mutate: mutateGroup, isLoading: groupLoading } = useGroupMy()

  const refresh = useCallback(() => {
    mutateUserDebt().then()
    mutateGroup().then()
  }, [])

  useEffect(() => {
    setIsLoading(userDebtLoading && groupLoading)
  }, [userDebtLoading, groupLoading])

  useEffect(() => {
    return navigation.addListener('focus', () => {
      refresh()
    })
  }, [navigation])

  useEffect(() => {
    const timer = setInterval(() => {
      refresh()
    }, 30000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const handleCloseAddGroupModal = useCallback(() => {
    setAddGroupComponent('DEFAULT')
    setShowAddGroupModal(false)
  }, [])

  const handleShowAbout = useCallback((v: boolean) => {
    setShowAboutModal(v)
  }, [])

  const handleCreateGroup = useCallback((groupName: string) => {
    dispatch(setLoading({ status: true }))
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
      .catch(() => {
        toast(t('createFail') + '')
      })
      .finally(() => {
        dispatch(setLoading({ status: false }))
        refresh()
      })
  }, [])

  const handleJoinGroup = useCallback((groupId: string) => {
    dispatch(setLoading({ status: true }))
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
      .catch(() => {
        toast(t('joinFail') + '')
      })
      .finally(() => {
        dispatch(setLoading({ status: false }))
        refresh()
      })
  }, [])

  const unarchivedGroupData = useMemo(() => {
    const { uuid = '' } = userInfo || {}
    return {
      data: groupData?.data?.filter(e => e?.archivedUsers?.findIndex(e => e === uuid) === -1),
    }
  }, [groupData, userInfo])

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
          />

          <Main
            userDebt={userDebt}
            groupData={unarchivedGroupData}
            loading={isLoading}
            onRefresh={refresh}
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
