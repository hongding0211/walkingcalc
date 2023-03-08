import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import * as Haptics from 'expo-haptics'
import React, { useCallback } from 'react'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import GroupCard from './groupCard'
import GroupCardSkeleton from './groupCardSkeleton'
import TopCard from './topCard'
import { GroupProps } from '../../../navigation/types'

interface IMain {
  userDebt?: any
  groupData?: any
  onRefresh?: () => void
  loading?: boolean
}

const Main: React.FC<IMain> = props => {
  const { userDebt, groupData, onRefresh, loading } = props

  const navigation = useNavigation<GroupProps['navigation']>()
  const insets = useSafeAreaInsets()

  const handlePressGroupCard = useCallback(
    (index: number) => {
      navigation.navigate('Group', {
        groupId: groupData.data[index].id,
      })
    },
    [groupData]
  )

  const handleRefresh = useCallback(() => {
    Haptics.selectionAsync().then()
    onRefresh && onRefresh()
  }, [])

  return (
    <View
      style={[
        styles.container,
        {
          height: Dimensions.get('window').height - insets.top - 80,
        },
      ]}
    >
      <TopCard total={userDebt?.data?.debt || 0} />
      {!groupData?.data && <GroupCardSkeleton />}
      {groupData?.data && (
        <FlashList
          data={groupData?.data}
          renderItem={({ item, index }: { item: any; index: number }) => (
            <Pressable
              style={styles.listItem}
              onPress={() => handlePressGroupCard(index)}
            >
              <GroupCard data={item} />
            </Pressable>
          )}
          keyExtractor={item => item.id}
          estimatedItemSize={140}
          onRefresh={handleRefresh}
          refreshing={loading}
          ListFooterComponent={<View style={{ height: 60 }} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
  },
  listItem: {
    marginTop: 20,
  },
})
