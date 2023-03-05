import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import FormItem from '../../../components/FormItem'
import Button from '../../../components/General/Button'
import Input from '../../../components/General/Input'

interface IJoinGroup {
  onConfirm?: (groupId: string) => void
}

const JoinGroup: React.FC<IJoinGroup> = ({ onConfirm }) => {
  const [groupId, setGroupId] = useState('')

  const { t } = useTranslation('home')

  const handleTextChange = useCallback((text: string) => {
    setGroupId(text.toUpperCase())
  }, [])

  return (
    <View style={styles.container}>
      <FormItem title={t('groupId') + ''}>
        <Input
          value={groupId}
          onChangeText={handleTextChange}
        />
      </FormItem>
      <View style={styles.btn}>
        <Button
          title={t('confirm') + ''}
          onPress={() => onConfirm && onConfirm(groupId)}
        />
      </View>
    </View>
  )
}

export default JoinGroup

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16,
  },
  btn: {
    marginTop: 20,
  },
})
