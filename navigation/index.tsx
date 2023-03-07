import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { useTranslation } from 'react-i18next'

import linking from './linking'
import { LoginStackParamList, RootStackParamList } from './types'
import { useAppSelector } from '../app/store'
import BackButton from '../components/Header/left'
import SettingButton from '../components/Header/right'
import useUser from '../feature/user/useUser'
import Splash from '../screens/Splash'
import Group from '../screens/group'
import Home from '../screens/home'
import Login from '../screens/login/Login'
import SSO from '../screens/modal/login/SSO'

const LoginScreen: React.FC = () => {
  const Stack = createNativeStackNavigator<LoginStackParamList>()

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="SSO"
          component={SSO}
          options={{
            headerTitle: '',
            headerTransparent: true,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const RootScreen: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  const { t } = useTranslation('group')

  return (
    <NativeBaseProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Group"
          component={Group}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerLeft: () => <BackButton title={t('group') + ''} />,
            headerRight: () => <SettingButton />,
            headerBlurEffect: 'regular',
          }}
        />
      </Stack.Navigator>
    </NativeBaseProvider>
  )
}

const Navigation: React.FC = () => {
  useUser()
  const { isLogin, isLoginComplete } = useAppSelector(state => state.user)

  if (!isLoginComplete) {
    return <Splash />
  }

  return <NavigationContainer linking={linking}>{!isLogin ? <LoginScreen /> : <RootScreen />}</NavigationContainer>
}

export default Navigation
