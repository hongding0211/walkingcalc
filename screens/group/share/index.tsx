import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

import ThemedText from '../../../components/General/Themed/Text'

interface IShare {
  groupId: string
}

const Share: React.FC<IShare> = props => {
  const { groupId } = props
  const value = `walkingcalc://group/${groupId}`

  const { t } = useTranslation('group')

  return (
    <View style={styles.container}>
      <QRCode
        value={value}
        size={150}
        backgroundColor="#ffffff"
      />
      <ThemedText style={styles.text}>{groupId}</ThemedText>
      <ThemedText
        style={styles.subText}
        type="SECOND"
      >
        {t('invite')}
      </ThemedText>
    </View>
  )
}

export default Share

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
    marginTop: 18,
  },
  subText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 24,
  },
})
