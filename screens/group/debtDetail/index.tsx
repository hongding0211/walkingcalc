import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import FormItem from '../../../components/FormItem'
import Avatar from '../../../components/General/Avatar'
import ThemedText from '../../../components/General/Themed/Text'
import { numberToString } from '../../../utlis/moeny'

interface IDebtDetail {}

interface IUserBar {
  name?: string
  avatar?: string
  debt?: number
}

const UserBar: React.FC<IUserBar> = props => {
  const { name, avatar, debt } = props

  return (
    <View style={styles.bar}>
      <View style={styles.bar}>
        <Avatar
          size={24}
          source={avatar}
        />
        <ThemedText style={{ marginLeft: 10, fontWeight: '500' }}>
          {name && name?.length > 10 ? name?.slice(0, 10) + '...' : name}
        </ThemedText>
      </View>
      <ThemedText style={{ fontWeight: '500', fontSize: 16 }}>{numberToString(debt || 0)}</ThemedText>
    </View>
  )
}
const DebtDetail: React.FC<IDebtDetail> = props => {
  const { t } = useTranslation('group')

  return (
    <View style={styles.container}>
      <FormItem title={t('debtDetail') + ''} />
      <FormItem title={t('debtResolve') + ''} />
    </View>
  )
}

export default DebtDetail

const styles = StyleSheet.create({
  container: {
    rowGap: 16,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
