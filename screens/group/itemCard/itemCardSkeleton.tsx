import { Skeleton } from 'native-base'
import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'

import Card from '../../../components/Card'
import { ThemeContext } from '../../../feature/theme/themeContext'

const ItemCardSkeleton: React.FC = () => {
  const theme = useContext(ThemeContext)
  return (
    <Card>
      <View style={styles.container}>
        <Skeleton
          w="10"
          rounded="full"
          startColor={theme.scheme === 'LIGHT' ? 'muted.200' : 'muted.800'}
        />
        <Skeleton.Text
          flex={1}
          lines={2}
          px="4"
          startColor={theme.scheme === 'LIGHT' ? 'muted.200' : 'muted.800'}
        />
      </View>
    </Card>
  )
}

export default ItemCardSkeleton

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
