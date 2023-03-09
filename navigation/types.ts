import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Home: undefined
  Group: {
    groupId: string
    showSetting?: boolean
  }
  CodeScan: undefined
}

export type LoginStackParamList = {
  Login: {
    ticket?: string
    type?: 'sso'
  }
  SSO: undefined
}

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>
export type GroupProps = NativeStackScreenProps<RootStackParamList, 'Group'>
export type CodeScanProps = NativeStackScreenProps<RootStackParamList, 'CodeScan'>
export type LoginProps = NativeStackScreenProps<LoginStackParamList, 'Login'>
