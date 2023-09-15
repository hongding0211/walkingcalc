import { faChevronRight, faCirclePlus, faCrown, faQrcode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, View } from 'react-native'

import { useAppSelector } from '../../../app/store'
import Card from '../../../components/Card'
import ThemedText from '../../../components/General/Themed/Text'
import ThemedPressable from '../../../components/General/ThemedPressable'
import StackedAvatar from '../../../components/StackedAvatar'
import { Color, ColorDark, Typography, TypographyDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'
import { numberToString } from '../../../utils/moeny'

interface ITopCard {
  data?: Record<string, any>
  onPressQrcode?: () => void
  onPressDebtDetail?: () => void
  onAddMember?: () => void
}

const StackComponent: React.FC<{ top: string; children?: React.ReactNode }> = props => {
  const { top, children } = props

  return (
    <View style={[styles.stackText]}>
      <ThemedText
        type="SECOND"
        style={styles.topText}
      >
        {top}
      </ThemedText>
      <View style={{ marginTop: 6 }}>{children}</View>
    </View>
  )
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

const TopCard: React.FC<ITopCard> = props => {
  const { data, onPressQrcode, onPressDebtDetail, onAddMember } = props

  const { t } = useTranslation('group')
  const theme = useContext(ThemeContext)
  const userInfo = useAppSelector(state => state.user.data)

  const debt = props.data?.membersInfo.find((e: any) => e.uuid === userInfo?.uuid)?.debt

  if (!data) {
    return null
  }

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.bar}>
          <ThemedText style={styles.title}>{data?.name}</ThemedText>
          <View style={styles.bar}>
            {data?.isOwner && (
              <FontAwesomeIcon
                icon={faCrown}
                style={{
                  marginRight: 8,
                  color: Color.Gold,
                }}
              />
            )}
            <ThemedPressable
              highLight
              onPress={onPressQrcode}
            >
              <FontAwesomeIcon
                icon={faQrcode}
                style={styles.topRight}
              />
            </ThemedPressable>
          </View>
        </View>
        <Pressable onPress={onAddMember}>
          <StackComponent top={t('members')}>
            <StackedAvatar
              data={[...props.data?.membersInfo, ...props.data?.tempUsers]}
              tail={
                props.data?.membersInfo.length + props.data?.tempUsers.length < 4 && (
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    size={14}
                    style={{
                      marginLeft: 4,
                      color: theme.scheme === 'LIGHT' ? Color.Second : ColorDark.Second,
                    }}
                  />
                )
              }
            />
          </StackComponent>
        </Pressable>
        <View style={styles.bar}>
          <ThemedPressable
            style={styles.bar}
            onPress={onPressDebtDetail}
            highLight
          >
            <ThemedText style={styles.bottomText}>{t('debtDetail')}</ThemedText>
            <FontAwesomeIcon
              icon={faChevronRight}
              size={12}
              style={{ color: theme.scheme === 'LIGHT' ? Typography.Primary : TypographyDark.Primary }}
            />
          </ThemedPressable>
          <StackText
            top={debt < -1e-10 ? t('myOwn') : t('ownMe')}
            bottom={(debt < -1e-10 ? '' : '+') + numberToString(debt)}
            align="flex-end"
          />
        </View>
      </View>
    </Card>
  )
}

export default TopCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 150,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
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
  pressed: {
    backgroundColor: Color.Highlight,
    borderRadius: 8,
  },
  pressedDark: {
    backgroundColor: ColorDark.Highlight,
    borderRadius: 8,
  },
})
