import React, { useCallback, useContext } from 'react'
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../app/store'
import Avatar from '../../components/General/Avatar'
import ThemedText from '../../components/General/Themed/Text'
import ItemCard from '../../components/ItemCard'
import { Color, ColorDark } from '../../constants/Colors'
import { ThemeContext } from '../../feature/theme/themeContext'
import { setToken } from '../../feature/user/userSlice'
import use1l8n from '../../utlis/use1l8n'

const Settings: React.FC = () => {
  const insets = useSafeAreaInsets()
  const theme = useContext(ThemeContext)
  const t = use1l8n('settings')
  const userData = useAppSelector(state => state.user.data)
  const dispatch = useDispatch()

  const logout = useCallback(() => {
    dispatch(
      setToken({
        token: undefined,
      })
    )
  }, [dispatch])

  const handlePressLogout = useCallback(() => {
    Alert.alert(t('confirmLogout'), '', [
      {
        text: t('cancel') + '',
        style: 'cancel',
      },
      {
        text: t('confirm') + '',
        onPress: logout,
      },
    ])
  }, [])

  const handlePressEditProfile = useCallback(() => {
    // TODO - HongD 06/27 00:17
  }, [])

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top + 42,
        paddingBottom: insets.bottom,
        backgroundColor: theme.scheme === 'LIGHT' ? Color.BackgroundSecond : ColorDark.BackgroundSecond,
      }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <ItemCard.Container title={t('user')}>
          <ItemCard.Item>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Avatar
                size={24}
                source={userData?.avatar}
              />
              <ThemedText style={{ fontWeight: '500' }}>{userData?.name}</ThemedText>
            </View>
          </ItemCard.Item>
          <ItemCard.Item
            title={t('editProfile')}
            showArrow
            onPress={handlePressEditProfile}
          />
        </ItemCard.Container>

        {/* // TODO - HongD 06/27 00:18  */}
        {/* <ItemCard.Container title={t('general')}>
          <ItemCard.Item
            title={t('theme')}
          >
            <Text>{theme.scheme === 'LIGHT' ? t('light') : t('dark')}</Text>
          </ItemCard.Item>
          <ItemCard.Item
            title={t('language')}
          >
          </ItemCard.Item>
        </ItemCard.Container> */}

        <ItemCard.Container>
          <ItemCard.Item onPress={handlePressLogout}>
            <Text style={styles.delText}>{t('logout')}</Text>
          </ItemCard.Item>
        </ItemCard.Container>
      </ScrollView>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginTop: 20,
    rowGap: 20,
  },
  delText: {
    textAlign: 'center',
    color: Color.Danger,
    fontWeight: '500',
  },
})
