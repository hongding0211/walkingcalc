import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Text } from 'react-native'

import { useAppSelector } from '../../../app/store'
import Card from '../../../components/Card'
import ThemedText from '../../../components/General/Themed/Text'
import { Color } from '../../../constants/Colors'
import { numberToString } from '../../../utlis/moeny'
import { useDate } from '../../../utlis/useDate'

interface IGroupCard {
  data: Record<string, any>
}

const StackText: React.FC<{ top: string; bottom: string; align: 'flex-start' | 'flex-end' }> = props => {
  const { top, bottom, align } = props

  return (
    <View style={[styles.stackText, { alignItems: align }]}>
      <ThemedText
        type="SECOND"
        style={styles.topText}
      >
        {top}
      </ThemedText>
      <ThemedText style={styles.bottomText}>{bottom}</ThemedText>
    </View>
  )
}

const GroupCard: React.FC<IGroupCard> = props => {
  const { t } = useTranslation('home')
  const { date } = useDate()
  const userInfo = useAppSelector(state => state.user.data)

  const debt = props.data?.membersInfo.find((e: any) => e.uuid === userInfo?.uuid)?.debt

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.bar}>
          <ThemedText style={styles.title}>{props.data?.name || ''}</ThemedText>
          <View style={styles.topRightContainer}>
            <FontAwesomeIcon
              style={styles.topRight}
              icon={faUser}
              size={12}
            />
            <Text style={styles.topRight}>{props.data?.membersInfo?.length + props.data?.tempUsers?.length}</Text>
          </View>
        </View>
        <View style={styles.bar}>
          <StackText
            top={t('lastEdit')}
            bottom={date(props.data?.lastModifiedAt || Date.now())}
            align="flex-start"
          />
          <StackText
            top={debt < 0 ? t('myOwn') : t('ownMe')}
            bottom={(debt < -1e-10 ? '' : '+') + numberToString(debt)}
            align="flex-end"
          />
        </View>
      </View>
    </Card>
  )
}

export default GroupCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 100,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
  },
  topRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  topRight: {
    color: Color.Primary,
    fontWeight: '500',
  },
  stackText: {
    flexDirection: 'column',
    rowGap: 2,
  },
  topText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bottomText: {
    fontWeight: '600',
  },
})
