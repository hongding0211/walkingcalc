import { Skeleton } from 'native-base'
import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Card from '../../components/Card'
import { ThemeContext } from '../../feature/theme/themeContext'

const TopCardSkeleton: React.FC = () => {
  const insets = useSafeAreaInsets()
  const theme = useContext(ThemeContext)

  return (
    <View style={{ paddingTop: insets.top + 64 }}>
      <Card>
        <View style={styles.container}>
          <Skeleton
            h="12"
            py="2"
            startColor={theme.scheme === 'LIGHT' ? 'muted.200' : 'muted.800'}
            rounded="sm"
          />
          <Skeleton.Text
            lines={1}
            pr="24"
            startColor={theme.scheme === 'LIGHT' ? 'muted.200' : 'muted.800'}
          />
          <Skeleton.Text lines={2} />
        </View>
      </Card>
    </View>
  )
}

export default TopCardSkeleton

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 150,
  },
})
