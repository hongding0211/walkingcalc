import { ScrollView } from 'native-base'
import React from 'react'
import { View } from 'react-native'

import Avatar from '../General/Avatar'

interface IStackedAvatar {
  data?: {
    avatar?: string
    name?: string
  }[]
  size?: number
}

const StackedAvatar: React.FC<IStackedAvatar> = props => {
  const { data, size = 22 } = props
  return (
    <ScrollView horizontal>
      {data?.map((e, idx) => (
        <View
          style={{ marginRight: 4 }}
          key={`${idx}_${e.name}`}
        >
          <Avatar
            name={e.name}
            source={e.avatar}
            size={size}
          />
        </View>
      ))}
    </ScrollView>
  )
}

export default StackedAvatar
