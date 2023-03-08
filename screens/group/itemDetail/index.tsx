import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import dayjs from 'dayjs'
import { ScrollView, Skeleton } from 'native-base'
import React, { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import FormItem from '../../../components/FormItem'
import Avatar from '../../../components/General/Avatar'
import Button from '../../../components/General/Button'
import Divider from '../../../components/General/Divider'
import ThemedText from '../../../components/General/Themed/Text'
import categoryMap from '../../../constants/Category'
import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'
import { MembersContext } from '../../../feature/user/membersContext'
import { numberToString } from '../../../utlis/moeny'
import { useDate } from '../../../utlis/useDate'

interface IItemDetail {
  data?: Record<string, any>
  onDelete?: () => void
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
          source={avatar}
          name={name}
        />
        <ThemedText style={{ marginLeft: 10, fontWeight: '500' }}>
          {name && name?.length > 10 ? name?.slice(0, 10) + '...' : name}
        </ThemedText>
      </View>
      <ThemedText style={{ fontWeight: '500', fontSize: 16 }}>{numberToString(debt || 0)}</ThemedText>
    </View>
  )
}

const ItemDetail: React.FC<IItemDetail> = props => {
  const { data, onDelete } = props

  const [mapLoading, setMapLoading] = useState(true)

  const theme = useContext(ThemeContext)
  const member = useContext(MembersContext)
  const { t } = useTranslation('group')
  const { fullDate } = useDate()

  const { long: longitude, lat: latitude } = data || {}

  const handleMapReady = useCallback(() => {
    setMapLoading(false)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <View style={styles.bar}>
          <ThemedText style={styles.emoji}>{categoryMap[data?.type]}</ThemedText>
          <View
            style={[styles.divider, { backgroundColor: theme.scheme === 'LIGHT' ? Color.Third : ColorDark.Third }]}
          />
          <View>
            <ThemedText style={{ fontSize: 12 }}>{fullDate(data?.modifiedAt)}</ThemedText>
            <ThemedText
              style={{
                fontWeight: '500',
                fontSize: 18,
                marginTop: 2,
              }}
            >
              {dayjs(data?.modifiedAt).format('MM:hh')}
            </ThemedText>
          </View>
        </View>
        <View style={styles.bar}>
          <FontAwesomeIcon
            icon={faUser}
            size={14}
            style={{ color: Color.Primary }}
          />
          <Text style={{ marginLeft: 4, color: Color.Primary, fontWeight: '500' }}>{data?.forWhom?.length}</Text>
        </View>
      </View>
      <Divider />
      <FormItem title={t('who') + ''}>
        <UserBar
          name={member.get(data?.who)?.name}
          avatar={member.get(data?.who)?.avatar}
          debt={data?.paid}
        />
      </FormItem>
      <Divider />
      <FormItem title={t('for') + `(${data?.forWhom?.length})`}>
        <ScrollView style={{ maxHeight: 135 }}>
          <View
            style={{ gap: 8 }}
            onStartShouldSetResponder={() => true}
          >
            {data?.forWhom?.map((u: any, idx: any) => (
              <View
                key={u}
                style={{ gap: 8 }}
              >
                <UserBar
                  name={member.get(u)?.name}
                  avatar={member.get(u)?.avatar}
                  debt={data?.paid / data?.forWhom?.length}
                />
                <Divider />
              </View>
            ))}
          </View>
        </ScrollView>
      </FormItem>
      {longitude && latitude && (
        <View>
          <View style={{ opacity: mapLoading ? 0 : 1 }}>
            <MapView
              initialCamera={{
                center: {
                  longitude: +longitude,
                  latitude: +latitude,
                },
                heading: 0,
                pitch: 0,
                altitude: 500,
              }}
              style={styles.map}
              zoomEnabled={false}
              scrollEnabled={false}
              rotateEnabled={false}
              toolbarEnabled={false}
              onMapReady={handleMapReady}
            >
              <Marker
                coordinate={{
                  longitude: +longitude,
                  latitude: +latitude,
                }}
              >
                <Avatar
                  size={30}
                  source={member.get(data?.who)?.avatar}
                  name={member.get(data?.who)?.name}
                />
              </Marker>
            </MapView>
          </View>
          {mapLoading && (
            <Skeleton
              startColor={theme.scheme === 'LIGHT' ? 'muted.200' : 'muted.800'}
              rounded="md"
              style={{ height: 100, position: 'absolute' }}
            />
          )}
        </View>
      )}
      {data?.text && (
        <ThemedText
          style={{ fontWeight: '500', fontSize: 12 }}
          type="SECOND"
        >
          {t('remark')}: {data.text}
        </ThemedText>
      )}
      <Button
        type="DANGER"
        title={t('delete')}
        onPress={onDelete}
      />
    </View>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
  container: {
    rowGap: 16,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emoji: {
    fontSize: 20,
  },
  divider: {
    width: 2,
    height: 32,
    marginHorizontal: 10,
  },
  map: {
    borderRadius: 8,
    height: 100,
  },
})
