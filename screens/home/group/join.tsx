import { faExpand } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Pressable, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../app/store'
import FormItem from '../../../components/FormItem'
import Button from '../../../components/General/Button'
import Input from '../../../components/General/Input'
import ThemedText from '../../../components/General/Themed/Text'
import useToast from '../../../components/Toast/useToast'
import { Color, ColorDark } from '../../../constants/Colors'
import { setScanSuccess } from '../../../feature/general/generalSlice'
import { ThemeContext } from '../../../feature/theme/themeContext'
import { CodeScanProps } from '../../../navigation/types'

interface IJoinGroup {
  onConfirm?: (groupId: string) => void
}

const JoinGroup: React.FC<IJoinGroup> = ({ onConfirm }) => {
  const [groupId, setGroupId] = useState('')

  const theme = useContext(ThemeContext)
  const { t } = useTranslation('home')
  const toast = useToast()
  const navigation = useNavigation<CodeScanProps['navigation']>()
  const scanData = useAppSelector(state => state.general.scan)
  const dispatch = useDispatch()

  const handleTextChange = useCallback((text: string) => {
    setGroupId(text.toUpperCase())
  }, [])

  const alertJoin = useCallback(
    (groupId: string) => {
      Alert.alert(t('confirmJoin') + ' ' + groupId + '?', '', [
        {
          text: t('cancel') + '',
          style: 'cancel',
        },
        {
          text: t('confirm') + '',
          onPress: () => {
            if (typeof onConfirm === 'function') {
              onConfirm(groupId)
            }
          },
        },
      ])
    },
    [onConfirm]
  )

  useEffect(() => {
    if (scanData.success && typeof scanData.data === 'string') {
      const match = scanData.data.match(/walkingcalc:\/\/group\/(\w+)/)
      if (!match) {
        toast(t('joinFail') + '')
        return
      }
      alertJoin(match[1])
    }
    dispatch(
      setScanSuccess({
        success: false,
      })
    )
  }, [scanData])

  const handleClickScan = useCallback(() => {
    navigation.navigate('CodeScan')
  }, [])

  const handleConfirm = useCallback(() => {
    if (groupId.length === 0) {
      toast(t('emptyGroupId') + '')
      return
    }
    if (typeof onConfirm === 'function') {
      onConfirm(groupId)
    }
  }, [groupId])

  return (
    <View style={styles.container}>
      <FormItem title={t('groupId') + ''}>
        <Input
          value={groupId}
          onChangeText={handleTextChange}
        />
      </FormItem>
      <Pressable
        onPress={handleClickScan}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
      >
        <FontAwesomeIcon
          style={{ color: theme.scheme === 'LIGHT' ? Color.Second : ColorDark.Second }}
          icon={faExpand}
        />
        <ThemedText type="SECOND">{t('scanQrcode')}</ThemedText>
      </Pressable>
      <View style={styles.btn}>
        <Button
          title={t('confirm') + ''}
          onPress={handleConfirm}
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
    marginTop: 12,
  },
})
