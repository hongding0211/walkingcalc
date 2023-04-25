import React, { useContext } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useAppSelector } from '../../app/store'
import ItemCard from '../../components/ItemCard'
import { Color, ColorDark } from '../../constants/Colors'
import { ThemeContext } from '../../feature/theme/themeContext'
import use1l8n from '../../utlis/use1l8n'

const Settings: React.FC = () => {
  const insets = useSafeAreaInsets()
  const theme = useContext(ThemeContext)
  const t = use1l8n('settings')
  const userData = useAppSelector(state => state.user.data)

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
          <ItemCard.Item
            title={userData?.name}
            showArrow
          />
        </ItemCard.Container>

        <ItemCard.Container title={t('user')}>
          <ItemCard.Item
            title={userData?.name}
            showArrow
          />
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
})
