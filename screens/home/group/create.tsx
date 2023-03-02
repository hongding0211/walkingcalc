import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import FormItem from '../../../components/FormItem'
import Button from '../../../components/General/Button'
import Input from '../../../components/General/Input'
import { Color } from '../../../constants/Colors'

interface ICreateGroup {
  onConfirm?: (groupId: string) => void
}

const CreateGroup: React.FC<ICreateGroup> = ({ onConfirm }) => {
  const [groupId, setGroupId] = useState('')

  const { t } = useTranslation('home')

  return (
    <View style={styles.container}>
      <FormItem title={t('groupName') + ''}>
        <Input
          value={groupId}
          onChangeText={setGroupId}
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

export default CreateGroup

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16,
  },
  icon: {
    color: Color.Primary,
  },
  btn: {
    marginTop: 20,
  },
})
