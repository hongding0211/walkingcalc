import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import DialogButton from 'react-native-dialog/lib/Button'
import DialogContainer from 'react-native-dialog/lib/Container'
import DialogInput from 'react-native-dialog/lib/Input'
import DialogTitle from 'react-native-dialog/lib/Title'

import { useAppSelector } from '../../../app/store'
import FormItem from '../../../components/FormItem'
import Avatar from '../../../components/General/Avatar'
import Button from '../../../components/General/Button'
import Divider from '../../../components/General/Divider'
import ThemedText from '../../../components/General/Themed/Text'
import ThemedPressable from '../../../components/General/ThemedPressable'
import useToast from '../../../components/Toast/useToast'
import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'
import { useChangeGroupName } from '../../../services/group'
import { numberToString } from '../../../utils/moeny'

interface IGroupSetting {
  data?: Record<string, any>
  recordCnt?: number
  onDismiss?: () => void
  onChangeName?: () => void
}

interface IUser {
  name?: string
  avatar?: string
}

const User: React.FC<IUser> = props => {
  const { name, avatar } = props

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 6 }}>
      <Avatar size={16} source={avatar} />
      <ThemedText style={{ fontWeight: '500' }}>{name}</ThemedText>
    </View>
  )
}

const GroupSetting: React.FC<IGroupSetting> = props => {
  const { data, recordCnt, onDismiss, onChangeName } = props

  const [showDialog, setShowDialog] = useState(false)
  const [groupName, setGroupName] = useState(data?.name || '')

  const userData = useAppSelector(state => state.user.data)

  const { t } = useTranslation('group')
  const theme = useContext(ThemeContext)
  const toast = useToast()

  const { trigger: triggerChangeGroupName } = useChangeGroupName()

  const handlePressEditName = useCallback(() => {
    setShowDialog(true)
  }, [])

  const handleConfirmChangeGroupName = useCallback(() => {
    if (!groupName) {
      toast(t('emptyName') + '')
      return
    }
    triggerChangeGroupName({
      body: {
        id: data?.id || '',
        name: groupName,
      },
    })
      .then(res => {
        if (res?.success) {
          toast(t('changeNameSuccess') + '')
          setShowDialog(false)
          if (typeof onChangeName === 'function') {
            onChangeName()
          }
          return
        }
        return Promise.reject()
      })
      .catch(() => {
        toast(t('generalError') + '')
      })
  }, [groupName])

  return (
    <>
      <View style={styles.container}>
        <FormItem
          title={t('groupName') + ''}
          style={styles.title}
          type="SECOND"
        >
          <View style={styles.itemContainer}>
            <ThemedText style={styles.text}>{data?.name}</ThemedText>
            {data?.isOwner && (
              <ThemedPressable padding={8} onPress={handlePressEditName}>
                <FontAwesomeIcon
                  icon={faEdit}
                  size={10}
                  color={
                    theme.scheme === 'LIGHT' ? Color.Second : ColorDark.Second
                  }
                />
              </ThemedPressable>
            )}
          </View>
        </FormItem>
        <Divider />
        <FormItem title={t('groupId') + ''} style={styles.title} type="SECOND">
          <ThemedText style={styles.text}>{data?.id}</ThemedText>
        </FormItem>
        <Divider />
        <FormItem title={t('members') + ''} style={styles.title} type="SECOND">
          <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
            {data?.membersInfo?.map((m: any) => (
              <User name={m?.name} avatar={m?.avatar} key={m?.uuid} />
            ))}
            {data?.tempUsers?.map((u: any) => (
              <User name={u?.name} key={u?.uuid} />
            ))}
          </View>
        </FormItem>
        <Divider />
        <FormItem
          title={t('recordCnt') + ''}
          style={styles.title}
          type="SECOND"
        >
          <ThemedText style={styles.text}>{recordCnt}</ThemedText>
        </FormItem>
        <Divider />
        <FormItem title={t('myCost') + ''} style={styles.title} type="SECOND">
          <ThemedText style={styles.text}>
            {numberToString(
              data?.membersInfo.find((e: any) => e.uuid === userData?.uuid)
                .cost || 0
            )}
          </ThemedText>
        </FormItem>
        <Divider />
        {data?.isOwner && (
          <Button type="DANGER" title={t('dismiss')} onPress={onDismiss} />
        )}
      </View>

      <DialogContainer visible={showDialog}>
        <DialogTitle>{t('changeGroupName')}</DialogTitle>
        <DialogInput
          placeholder={t('changeGroupName') + ''}
          value={groupName}
          onChangeText={setGroupName}
        />
        <DialogButton
          label={t('cancel')}
          onPress={() => setShowDialog(false)}
        />
        <DialogButton
          label={t('confirm')}
          onPress={handleConfirmChangeGroupName}
        />
      </DialogContainer>
    </>
  )
}

export default GroupSetting

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
  },
  title: {
    fontSize: 12,
  },
  text: {
    fontWeight: '600',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
