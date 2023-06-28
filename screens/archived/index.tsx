import React, { useContext } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import ItemCard from '../../components/ItemCard'
import { Color, ColorDark } from '../../constants/Colors'
import { ThemeContext } from '../../feature/theme/themeContext'

const Archived: React.FC = () => {
  const insets = useSafeAreaInsets()
  const theme = useContext(ThemeContext)

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
        <ItemCard.Container>
          <ItemCard.Item title="Group1" />
        </ItemCard.Container>
      </ScrollView>
    </View>
  )
}

export default Archived

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
