import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import FormItem from '../../../components/FormItem'
import Button from '../../../components/General/Button'
import Input from '../../../components/General/Input'

const JoinGroup: React.FC = () => {
  const [groupId, setGroupId] = useState('')

  const { t } = useTranslation('home')

  return (
    <View style={styles.container}>
      <FormItem title={t('groupId') + ''}>
        <Input
          value={groupId}
          onChangeText={setGroupId}
        />
      </FormItem>
      <View style={styles.btn}>
        <Button title={t('confirm') + ''} />
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
