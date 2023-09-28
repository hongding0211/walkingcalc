import * as Haptics from 'expo-haptics'
import React, { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'

import CategoryRadio from './categoryRadio'
import NumberInput from './numberInput'
import { useAppSelector } from '../../../app/store'
import FormItem from '../../../components/FormItem'
import Button from '../../../components/General/Button'
import Checkbox from '../../../components/General/Checkbox'
import Input from '../../../components/General/Input'
import Radio from '../../../components/General/Radio'
import ThemedText from '../../../components/General/Themed/Text'
import ThemedPressable from '../../../components/General/ThemedPressable'
import useToast from '../../../components/Toast/useToast'
import { setLoading } from '../../../feature/general/generalSlice'
import { MembersContext } from '../../../feature/user/membersContext'
import { useEditRecord } from '../../../services/record'
import { stringToNumber } from '../../../utils/moeny'

interface IEditGroup {
  groupId: string
  data?: Record<string, any>
  onEdit?: () => void
}

const EditRecord: React.FC<IEditGroup> = props => {
  const { groupId, data, onEdit } = props

  const userInfo = useAppSelector(state => state.user.data)

  const [paid, setPaid] = useState((+data?.paid || 0) / 100 + '')
  const [who, setWho] = useState(data?.who || userInfo?.uuid)
  const [forWhom, setForWhom] = useState<any>(data?.forWhom || [])
  const [type, setType] = useState(data?.type || 'food')
  const [text, setText] = useState(data?.text || '')

  const { t } = useTranslation('group')
  const members = useContext(MembersContext)
  const toast = useToast()
  const dispatch = useDispatch()

  const { trigger: triggerEditRecord } = useEditRecord()

  const handlePressSelectAll = useCallback(() => {
    if (forWhom.length !== members.size) {
      setForWhom([...members.keys()])
    } else {
      setForWhom([])
    }
  }, [members, forWhom])

  const handleEdit = useCallback(() => {
    Haptics.selectionAsync().then()
    if (paid.length === 0) {
      toast(t('enterAmount') + '')
      return
    }
    if (!groupId || !who) {
      toast(t('addFail') + '')
      return
    }
    if (forWhom.length < 1) {
      toast(t('atLeastOnePeople') + '')
      return
    }
    dispatch(
      setLoading({
        status: true,
      })
    )
    triggerEditRecord({
      body: {
        groupId,
        recordId: data?.recordId,
        who,
        paid: stringToNumber(paid),
        forWhom,
        type,
        text,
      },
    })
      .then(res => {
        if (res?.success) {
          toast(t('editSuccess') + '')
          onEdit && onEdit()
        } else {
          toast(t('editFail') + '')
        }
      })
      .catch(() => {
        toast(t('generalError') + '')
      })
      .finally(() => {
        dispatch(
          setLoading({
            status: false,
          })
        )
      })
  }, [groupId, paid, who, forWhom, type, text, data])

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
      <FormItem
        titleComponent={
          <View style={styles.titleContainer}>
            <ThemedText style={styles.title}>{t('for')}</ThemedText>
            <ThemedPressable onPress={handlePressSelectAll}>
              <ThemedText
                type="SECOND"
                style={styles.textButton}
              >
                {t('selectAll')}
              </ThemedText>
            </ThemedPressable>
          </View>
        }
      >
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
        title={t('edit')}
        onPress={handleEdit}
      />
    </View>
  )
}

export default EditRecord

const styles = StyleSheet.create({
  container: {
    rowGap: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  textButton: {
    fontSize: 12,
    fontWeight: '500',
  },
})
