import { faCircleXmark, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import DialogButton from 'react-native-dialog/lib/Button'
import DialogContainer from 'react-native-dialog/lib/Container'
import DialogInput from 'react-native-dialog/lib/Input'
import DialogTitle from 'react-native-dialog/lib/Title'

import FormItem from '../../../components/FormItem'
import Avatar from '../../../components/General/Avatar'
import Button from '../../../components/General/Button'
import Divider from '../../../components/General/Divider'
import ThemedText from '../../../components/General/Themed/Text'
import useToast from '../../../components/Toast/useToast'
import UserSearch from '../../../components/UserSearch'
import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'

interface IAddMember {
  groupData?: Record<string, any>
  onConfirm?: (data?: { user?: any; tempUser?: any }) => void
}

interface IUser {
  name?: string
  avatar?: string
}

const User: React.FC<IUser> = props => {
  const { name, avatar } = props

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 6 }}>
      <Avatar size={16} name={name} source={avatar} />
      <ThemedText style={{ fontWeight: '500' }}>{name}</ThemedText>
    </View>
  )
}

const AddMember: React.FC<IAddMember> = props => {
  const { groupData, onConfirm } = props

  const { t } = useTranslation('group')
  const toast = useToast()
  const theme = useContext(ThemeContext)

  const [userToBeAdd, setUserToBeAdd] = useState<any>([])
  const [tempUserToBeAdd, setTempUserToBeAdd] = useState<any>([])
  const [showDialog, setShowDialog] = useState(false)
  const [tempUserInput, setTempUserInput] = useState('')

  const handleSelectUser = useCallback(
    (user?: any) => {
      if (!user) {
        return
      }
      if (groupData?.membersInfo?.find(e => e.uuid === user?.uuid)) {
        toast(t('alreadyInGroup') + '')
        return
      }
      if (userToBeAdd?.find(e => e.uuid === user?.uuid)) {
        toast(t('alreadyInGroup') + '')
        return
      }
      setUserToBeAdd([...userToBeAdd, user])
    },
    [userToBeAdd]
  )

  const handlePressDelUser = useCallback(
    (user?: any) => {
      if (!user) {
        return
      }
      setUserToBeAdd(userToBeAdd.filter(e => e.uuid !== user.uuid))
    },
    [userToBeAdd]
  )

  const handlePressDelTempUser = useCallback(
    (name?: string) => {
      if (!name) {
        return
      }
      setTempUserToBeAdd(tempUserToBeAdd.filter(e => e !== name))
    },
    [tempUserToBeAdd]
  )

  const handleAddTempUser = useCallback(() => {
    setShowDialog(true)
  }, [])

  const handleConfirmAddTempUser = useCallback(() => {
    if (!tempUserInput) {
      toast(t('emptyName') + '')
      return
    }
    if (tempUserToBeAdd.indexOf(tempUserInput) !== -1) {
      toast(t('duplicateName') + '')
      return
    }
    setShowDialog(false)
    setTempUserToBeAdd([...tempUserToBeAdd, tempUserInput])
  }, [tempUserInput])

  useEffect(() => {
    if (!showDialog) {
      setTempUserInput('')
    }
  }, [showDialog])

  return (
    <>
      <View style={styles.container}>
        <UserSearch onSelect={handleSelectUser} />
        {groupData?.isOwner && (
          <Pressable
            onPress={handleAddTempUser}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
          >
            <FontAwesomeIcon
              style={{
                color:
                  theme.scheme === 'LIGHT' ? Color.Second : ColorDark.Second,
              }}
              icon={faUserPlus}
            />
            <ThemedText type="SECOND">{t('addTempUser')}</ThemedText>
          </Pressable>
        )}
        <Divider />
        <FormItem
          title={
            t('members') +
            `(${groupData?.membersInfo?.length + groupData?.tempUsers?.length})`
          }
          style={styles.title}
          type="SECOND"
        >
          <ScrollView horizontal>
            <View
              onStartShouldSetResponder={() => true}
              style={{ flexDirection: 'row', gap: 8 }}
            >
              {groupData?.membersInfo?.map((m: any) => (
                <User name={m?.name} avatar={m?.avatar} key={m?.uuid} />
              ))}
              {groupData?.tempUsers?.map((u: any) => (
                <User name={u?.name} key={u?.uuid} />
              ))}
            </View>
          </ScrollView>
        </FormItem>
        <Divider />
        {userToBeAdd.length + tempUserToBeAdd.length > 0 && (
          <>
            <FormItem
              title={t('newMember') + ''}
              style={styles.title}
              type="SECOND"
            >
              <ScrollView horizontal>
                <View
                  onStartShouldSetResponder={() => true}
                  style={{ flexDirection: 'row', columnGap: 8 }}
                >
                  {userToBeAdd.map((m: any) => (
                    <Pressable
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => handlePressDelUser(m)}
                      key={m?.uuid}
                    >
                      <User name={m?.name} avatar={m?.avatar} />
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        size={10}
                        style={{
                          color:
                            theme.scheme === 'LIGHT'
                              ? Color.Second
                              : ColorDark.Second,
                          marginLeft: 4,
                        }}
                      />
                    </Pressable>
                  ))}
                  {tempUserToBeAdd.map((u: any) => (
                    <Pressable
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => handlePressDelTempUser(u)}
                      key={u}
                    >
                      <User name={u} />
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        size={10}
                        style={{
                          color:
                            theme.scheme === 'LIGHT'
                              ? Color.Second
                              : ColorDark.Second,
                          marginLeft: 4,
                        }}
                      />
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </FormItem>
          </>
        )}
        <Button
          title={t('confirm')}
          onPress={() =>
            onConfirm &&
            onConfirm({
              user: userToBeAdd,
              tempUser: tempUserToBeAdd,
            })
          }
        />
      </View>

      <DialogContainer visible={showDialog}>
        <DialogTitle>{t('enterName')}</DialogTitle>
        <DialogInput
          placeholder={t('enterName') + ''}
          value={tempUserInput}
          onChangeText={setTempUserInput}
        />
        <DialogButton
          label={t('cancel')}
          onPress={() => setShowDialog(false)}
        />
        <DialogButton label={t('confirm')} onPress={handleConfirmAddTempUser} />
      </DialogContainer>
    </>
  )
}

export default AddMember

const styles = StyleSheet.create({
  container: {
    rowGap: 16,
  },
  title: {
    fontSize: 12,
  },
})
