import { Skeleton } from 'native-base'
import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'

import Card from '../../../components/Card'
import { ThemeContext } from '../../../feature/theme/themeContext'

const GroupCardSkeleton: React.FC = () => {
  const theme = useContext(ThemeContext)
  return (
    <View style={{ marginTop: 20 }}>
      <Card>
        <View style={styles.container}>
          <Skeleton
            h="12"
            rounded="sm"
            startColor={theme.scheme === 'LIGHT' ? 'muted.200' : 'muted.800'}
          />
          <Skeleton.Text
            lines={2}
            pr="4"
            startColor={theme.scheme === 'LIGHT' ? 'muted.200' : 'muted.800'}
          />
        </View>
      </Card>
    </View>
  )
}

export default GroupCardSkeleton

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 100,
  },
})
