import { faArrowRight, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'

import FormItem from '../../../components/FormItem'
import Avatar from '../../../components/General/Avatar'
import Button from '../../../components/General/Button'
import Divider from '../../../components/General/Divider'
import ThemedText from '../../../components/General/Themed/Text'
import ThemedPressable from '../../../components/General/ThemedPressable'
import { Color, ColorDark, Typography, TypographyDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'
import { IResolvedDebt, resolveDebt } from '../../../utils/debt'
import { numberToString } from '../../../utils/moeny'

interface IDebtDetail {
  data?: Record<string, any>
  onResolveDebt?: (debt: IResolvedDebt[]) => void
  onResolveSingleDebt?: (debt: IResolvedDebt) => void
}

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
          name={name}
          source={avatar}
        />
        <ThemedText style={{ marginLeft: 10, fontWeight: '500' }}>
          {name && name?.length > 10 ? name?.slice(0, 10) + '...' : name}
        </ThemedText>
      </View>
      <ThemedText
        style={[
          { fontWeight: '500', fontSize: 16 },
          {
            color: debt !== undefined && debt < -1e-10 ? Color.Danger : Color.Success,
          },
        ]}
      >
        {debt && debt < -1e-10 ? '' : '+'}
        {numberToString(debt || 0)}
      </ThemedText>
    </View>
  )
}

const Transfer: React.FC<{ debt: IResolvedDebt } & { onPress?: () => void }> = ({ debt, onPress }) => {
  const { from, to, amount } = debt

  const theme = useContext(ThemeContext)

  return (
    <>
      <View style={styles.bar}>
        <View style={[styles.bar, { columnGap: 8 }]}>
          <Avatar
            size={24}
            name={from.name}
            source={from.avatar}
          />
          <ThemedText>{from.name}</ThemedText>
        </View>
        <View style={[styles.bar, { columnGap: 8 }]}>
          <ThemedText>{to.name}</ThemedText>
          <Avatar
            size={24}
            name={to.name}
            source={to.avatar}
          />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: 16,
          width: Dimensions.get('window').width - 80,
          height: 24,
        }}
      >
        <FontAwesomeIcon
          style={{
            color: theme.scheme === 'LIGHT' ? Color.Second : ColorDark.Second,
          }}
          size={14}
          icon={faArrowRight}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: Dimensions.get('window').width - 80,
          padding: 4,
          borderRadius: 4,
        }}
      >
        <Text style={{ fontSize: 10 }}>💸</Text>
        <ThemedText style={{ fontWeight: '500' }}>{numberToString(amount)}</ThemedText>

        <View
          style={{
            position: 'absolute',
            right: 0,
          }}
        >
          <ThemedPressable
            highLight
            onPress={onPress}
          >
            <FontAwesomeIcon
              size={14}
              icon={faCircleCheck}
              color={theme.scheme === 'LIGHT' ? Typography.Primary : TypographyDark.Primary}
            />
          </ThemedPressable>
        </View>
      </View>
    </>
  )
}
const DebtDetail: React.FC<IDebtDetail> = props => {
  const { t } = useTranslation('group')

  const { data, onResolveDebt, onResolveSingleDebt } = props

  const resolvedDebt = resolveDebt([...(data?.membersInfo || []), ...(data?.tempUsers || [])])

  return (
    <View style={styles.container}>
      <FormItem title={t('debtDetail') + `(${data?.membersInfo?.length + data?.tempUsers?.length})`}>
        <ScrollView style={styles.scroll}>
          <View
            style={styles.list}
            onStartShouldSetResponder={() => true}
          >
            {data?.membersInfo?.map(m => (
              <View
                key={m.uuid}
                style={{ rowGap: 8 }}
              >
                <UserBar
                  name={m.name}
                  debt={m.debt}
                  avatar={m.avatar}
                />
                <Divider />
              </View>
            ))}
            {data?.tempUsers?.map(m => (
              <View
                key={m.uuid}
                style={{ rowGap: 8 }}
              >
                <UserBar
                  name={m.name}
                  debt={m.debt}
                />
                <Divider />
              </View>
            ))}
          </View>
        </ScrollView>
      </FormItem>
      <FormItem title={t('debtResolve') + `(${resolvedDebt.length})`}>
        <ScrollView style={{ maxHeight: 200 }}>
          <View
            style={styles.list}
            onStartShouldSetResponder={() => true}
          >
            {resolvedDebt.map((d, idx) => (
              <View
                key={idx}
                style={{ rowGap: 8 }}
              >
                <Transfer
                  debt={d}
                  onPress={() => onResolveSingleDebt && onResolveSingleDebt(d)}
                />
                <Divider />
              </View>
            ))}
          </View>
        </ScrollView>
      </FormItem>
      <Button
        title={t('debtResolve')}
        type="DANGER"
        onPress={() => onResolveDebt && onResolveDebt(resolvedDebt)}
      />
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
  scroll: {
    maxHeight: 135,
  },
  list: {
    rowGap: 16,
  },
})
