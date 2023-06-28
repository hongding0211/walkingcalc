import { faArchive, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import * as Haptics from 'expo-haptics'
import React, { useCallback, useContext, useRef } from 'react'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Archive from './components/archive'
import GroupCard from './groupCard'
import GroupCardSkeleton from './groupCardSkeleton'
import TopCard from './topCard'
import ThemedText from '../../../components/General/Themed/Text'
import ThemedPressable from '../../../components/General/ThemedPressable'
import { Color, Typography, TypographyDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'
import { GroupProps } from '../../../navigation/types'
import use1l8n from '../../../utlis/use1l8n'

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
  const t = use1l8n('home')
  const theme = useContext(ThemeContext)

  const swipeLock = useRef(false)

  const handlePressGroupCard = useCallback(
    (index: number) => {
      setTimeout(() => {
        if (swipeLock.current) {
          return
        }
        navigation.navigate('Group', {
          groupId: groupData.data[index].id,
        })
      }, 0)
    },
    [groupData]
  )

  const handleRefresh = useCallback(() => {
    Haptics.selectionAsync().then()
    onRefresh && onRefresh()
  }, [])

  const handleSwipBegin = useCallback(() => {
    swipeLock.current = false
  }, [])

  const handleSwipEnd = useCallback((index: number) => {
    swipeLock.current = true
    // TODO - HongD 06/28 16:05 archive
  }, [])

  const handlePressArchive = useCallback(() => {
    navigation.navigate('Archived')
  }, [])

  const headerComponent = useCallback(() => {
    return (
      <View style={styles.headerComponentContainer}>
        <ThemedText
          style={styles.sectionHeader}
          type="SECOND"
        >
          {`${t('allGroups')} (${groupData?.data?.length || 0})`}
        </ThemedText>
        <ThemedPressable
          highLight
          onPress={handlePressArchive}
        >
          <FontAwesomeIcon
            icon={faArchive}
            size={14}
            style={{
              color: theme.scheme === 'LIGHT' ? Typography.Second : TypographyDark.Second,
            }}
          />
          <FontAwesomeIcon
            icon={faCircle}
            style={styles.dot}
            size={6}
          />
        </ThemedPressable>
      </View>
    )
  }, [groupData])

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
            <Swipeable
              renderLeftActions={() => <Archive title={t('archive')} />}
              containerStyle={{ marginTop: index === 0 ? 0 : 20 }}
              onBegan={handleSwipBegin}
              onEnded={() => handleSwipEnd(index)}
            >
              <Pressable onPress={() => handlePressGroupCard(index)}>
                <GroupCard data={item} />
              </Pressable>
            </Swipeable>
          )}
          ListHeaderComponent={headerComponent}
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
  sectionHeader: {
    fontSize: 12,
  },
  headerComponentContainer: {
    marginVertical: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  dot: {
    color: Color.Primary,
    position: 'absolute',
    right: 2,
    top: 2,
  },
})
