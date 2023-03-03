import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'

import Card from '../../../components/Card'
import ThemedText from '../../../components/General/Themed/Text'
import { Color } from '../../../constants/Colors'
import { numberToString } from '../../../utlis/moeny'

interface ITopCard {
  total: number
}

const TopCard: React.FC<ITopCard> = props => {
  const { total } = props

  const { t } = useTranslation('home')

  return (
    <Card>
      <View style={styles.top}>
        <FontAwesomeIcon
          icon={faWallet}
          style={{
            color: total < 0 ? Color.Danger : Color.Success,
          }}
        />
        <Text
          style={[
            styles.title,
            {
              color: total < 0 ? Color.Danger : Color.Success,
            },
          ]}
        >
          {t('totalDebt')}
        </Text>
      </View>
      <ThemedText style={styles.amount}>{`${total < 0 ? '' : '+'}` + numberToString(total)}</ThemedText>
    </Card>
  )
}

export default TopCard

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    columnGap: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  amount: {
    fontSize: 36,
    fontWeight: '500',
    marginTop: 36,
  },
})
