import * as Haptics from 'expo-haptics'
import React, { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import CategoryRadio from './categoryRadio'
import NumberInput from './numberInput'
import { useAppSelector } from '../../../app/store'
import FormItem from '../../../components/FormItem'
import Button from '../../../components/General/Button'
import Checkbox from '../../../components/General/Checkbox'
import Input from '../../../components/General/Input'
import Radio from '../../../components/General/Radio'
import useToast from '../../../components/Toast/useToast'
import { MembersContext } from '../../../feature/user/membersContext'
import { useAddRecord } from '../../../services/record'
import { stringToNumber } from '../../../utlis/moeny'

interface IAddGroup {
  groupId?: string
  onAdd?: () => void
}

const AddRecord: React.FC<IAddGroup> = props => {
  const { groupId, onAdd } = props

  const userInfo = useAppSelector(state => state.user.data)

  const [paid, setPaid] = useState('')
  const [who, setWho] = useState(userInfo?.uuid)
  const [forWhom, setForWhom] = useState<any>([])
  const [type, setType] = useState('food')
  const [text, setText] = useState('')

  const { t } = useTranslation('group')
  const members = useContext(MembersContext)
  const toast = useToast()

  const { trigger: triggerAddRecord } = useAddRecord()

  const handleAdd = useCallback(() => {
    Haptics.selectionAsync().then()
    if (!groupId || !who) {
      toast(t('addFail') + '')
      return
    }
    if (forWhom.length < 1) {
      toast(t('atLeastOnePeople') + '')
      return
    }
    triggerAddRecord({
      body: {
        groupId,
        who,
        paid: stringToNumber(paid),
        forWhom,
        type,
        text,
        long: '',
        lat: '',
      },
    }).then(res => {
      if (res?.success) {
        onAdd && onAdd()
      } else {
        toast(t('addFail') + '')
      }
    })
  }, [groupId, paid, forWhom, type, text])

  return (
    <View style={styles.container}>
      <NumberInput
        value={paid}
        onChangeText={setPaid}
      />
      <FormItem title={t('who') + ''}>
        <Radio
          value={who}
          options={[...members.values()].map(m => ({ value: m.uuid, title: m.name }))}
          onChange={setWho}
        />
      </FormItem>
      <FormItem title={t('for') + ''}>
        <Checkbox
          value={forWhom}
          options={[...members.values()].map(m => ({ value: m.uuid, title: m.name }))}
          onChange={setForWhom}
        />
      </FormItem>
      <FormItem title={t('category') + ''}>
        <CategoryRadio
          value={type}
          onChange={setType}
        />
      </FormItem>
      <Input
        value={text}
        onChangeText={setText}
        placeholder={t('remark') + ''}
      />
      <Button
        title={t('add')}
        onPress={handleAdd}
      />
    </View>
  )
}

export default AddRecord

const styles = StyleSheet.create({
  container: {
    rowGap: 16,
  },
})