import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Home: undefined
  Group: {
    groupId: string
    showSetting?: boolean
  }
}

export type LoginStackParamList = {
  Login: undefined
  SSO: undefined
}

export type GroupProps = NativeStackScreenProps<RootStackParamList, 'Group'>
