import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import FormItem from '../../../components/FormItem'
import Avatar from '../../../components/General/Avatar'
import Button from '../../../components/General/Button'
import Divider from '../../../components/General/Divider'
import ThemedText from '../../../components/General/Themed/Text'

interface IGroupSetting {
  data?: Record<string, any>
  recordCnt?: number
  onDismiss?: () => void
}

interface IUser {
  name?: string
  avatar?: string
}

const User: React.FC<IUser> = props => {
  const { name, avatar } = props

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 6 }}>
      <Avatar
        size={16}
        source={avatar}
      />
      <ThemedText style={{ fontWeight: '500' }}>{name}</ThemedText>
    </View>
  )
}

const GroupSetting: React.FC<IGroupSetting> = props => {
  const { data, recordCnt, onDismiss } = props

  const { t } = useTranslation('group')

  return (
    <View style={styles.container}>
      <FormItem
        title={t('groupName') + ''}
        style={styles.title}
        type="SECOND"
      >
        <ThemedText style={styles.text}>{data?.name}</ThemedText>
      </FormItem>
      <Divider />
      <FormItem
        title={t('groupId') + ''}
        style={styles.title}
        type="SECOND"
      >
        <ThemedText style={styles.text}>{data?.id}</ThemedText>
      </FormItem>
      <Divider />
      <FormItem
        title={t('members') + ''}
        style={styles.title}
        type="SECOND"
      >
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          {data?.membersInfo?.map((m: any) => (
            <User
              name={m?.name}
              avatar={m?.avatar}
              key={m?.uuid}
            />
          ))}
          {data?.tempUsers?.map((u: any) => (
            <User
              name={u?.name}
              key={u?.uuid}
            />
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
      {data?.isOwner && (
        <Button
          type="DANGER"
          title={t('dismiss')}
          onPress={onDismiss}
        />
      )}
    </View>
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
})
