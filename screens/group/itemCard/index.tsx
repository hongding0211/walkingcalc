import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { ScrollView } from 'native-base'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import { useAppSelector } from '../../../app/store'
import Card from '../../../components/Card'
import Tag from '../../../components/General/Tag'
import ThemedText from '../../../components/General/Themed/Text'
import categoryMap from '../../../constants/Category'
import { Color, ColorDark, Typography, TypographyDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'
import { MembersContext } from '../../../feature/user/membersContext'
import { numberToString } from '../../../utils/moeny'
import { useDate } from '../../../utils/useDate'

interface IItemCard {
  data?: Record<string, any>
}

const ItemCard: React.FC<IItemCard> = props => {
  const { data } = props

  const theme = useContext(ThemeContext)
  const member = useContext(MembersContext)
  const userInfo = useAppSelector(state => state.user.data)
  const { time } = useDate()
  const { t } = useTranslation('group')

  return (
    <Card>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <ThemedText style={styles.emoji}>{categoryMap[data?.type] || '🍎'}</ThemedText>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon
                icon={faUser}
                size={10}
                style={{ color: theme.scheme === 'LIGHT' ? Typography.Second : TypographyDark.Second, marginRight: 2 }}
              />
              <ThemedText
                type="SECOND"
                style={{ fontSize: 12 }}
              >
                {data?.forWhom?.length}
              </ThemedText>
            </View>
          </View>
          <View
            style={[styles.divider, { backgroundColor: theme.scheme === 'LIGHT' ? Color.Third : ColorDark.Third }]}
          />
          <View style={{ flexShrink: 1, paddingRight: 8 }}>
            <ScrollView horizontal>
              <View
                onStartShouldSetResponder={() => true}
                style={{ flexDirection: 'row', columnGap: 4 }}
              >
                {data?.forWhom?.map((e: any) => (
                  <Tag
                    key={e}
                    text={member.get(e)?.name || ''}
                  />
                ))}
              </View>
            </ScrollView>
            <ThemedText
              type="SECOND"
              style={styles.time}
            >
              {time(data?.modifiedAt)}
            </ThemedText>
          </View>
        </View>

        <View style={{ alignItems: 'flex-end', flexShrink: 0 }}>
          <ThemedText style={styles.amount}>{numberToString(data?.paid)}</ThemedText>
          {data?.isDebtResolve ? (
            <ThemedText
              type="SECOND"
              style={styles.myPart}
            >
              {t('debtResolveMark')}
            </ThemedText>
          ) : (
            <ThemedText
              type="SECOND"
              style={styles.myPart}
            >
              {t('myPart')}:{' '}
              {data?.forWhom?.indexOf(userInfo?.uuid) === -1 ? 0 : numberToString(data?.paid / data?.forWhom?.length)}
            </ThemedText>
          )}
        </View>
      </View>
    </Card>
  )
}

export default ItemCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  emoji: {
    fontSize: 20,
  },
  divider: {
    width: 2,
    height: 32,
    marginHorizontal: 16,
  },
  time: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  amount: {
    marginBottom: 6,
    fontWeight: '600',
  },
  myPart: {
    fontSize: 12,
    fontWeight: '600',
  },
})
