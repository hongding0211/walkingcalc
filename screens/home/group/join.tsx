import { faExpand } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, View } from 'react-native'

import FormItem from '../../../components/FormItem'
import Button from '../../../components/General/Button'
import Input from '../../../components/General/Input'
import ThemedText from '../../../components/General/Themed/Text'
import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'

interface IJoinGroup {
  onConfirm?: (groupId: string) => void
}

const JoinGroup: React.FC<IJoinGroup> = ({ onConfirm }) => {
  const [groupId, setGroupId] = useState('')

  const theme = useContext(ThemeContext)
  const { t } = useTranslation('home')

  const handleTextChange = useCallback((text: string) => {
    setGroupId(text.toUpperCase())
  }, [])

  const handleScan = useCallback(() => {}, [])

  return (
    <View style={styles.container}>
      <FormItem title={t('groupId') + ''}>
        <Input
          value={groupId}
          onChangeText={handleTextChange}
        />
      </FormItem>
      {/*<Pressable*/}
      {/*  onPress={handleScan}*/}
      {/*  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}*/}
      {/*>*/}
      {/*  <FontAwesomeIcon*/}
      {/*    style={{ color: theme.scheme === 'LIGHT' ? Color.Second : ColorDark.Second }}*/}
      {/*    icon={faExpand}*/}
      {/*  />*/}
      {/*  <ThemedText type="SECOND">{t('scanQrcode')}</ThemedText>*/}
      {/*</Pressable>*/}
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
    marginTop: 12,
  },
})
