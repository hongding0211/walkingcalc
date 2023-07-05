import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeBaseProvider } from 'native-base'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import linking from './linking'
import { LoginStackParamList, RootStackParamList } from './types'
import { useAppSelector } from '../app/store'
import BackButton from '../components/Header/left'
import SettingButton from '../components/Header/right'
import QRCodeScanner from '../components/QRCodeScaner'
import { Color, ColorDark, Typography, TypographyDark } from '../constants/Colors'
import { ThemeContext } from '../feature/theme/themeContext'
import useUser from '../feature/user/useUser'
import Splash from '../screens/Splash'
import Archived from '../screens/archived'
import Group from '../screens/group'
import Home from '../screens/home'
import Login from '../screens/login/Login'
import SSO from '../screens/modal/login/SSO'
import SsoMy from '../screens/modal/login/ssoMy'
import Settings from '../screens/settings'

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
  const { t: tCommon } = useTranslation('common')
  const theme = useContext(ThemeContext)

  return (
    <NativeBaseProvider>
      <Stack.Navigator>
        <Stack.Group>
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
          <Stack.Screen
            name="Archived"
            component={Archived}
            options={{
              headerTransparent: true,
              headerTitle: tCommon('archivedGroup') + '',
              headerTitleStyle: {
                color: theme.scheme === 'LIGHT' ? Typography.Primary : TypographyDark.Primary,
              },
              headerStyle: {
                backgroundColor: theme.scheme === 'LIGHT' ? Color.Background : ColorDark.Background,
              },
              headerBlurEffect: 'regular',
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerTransparent: true,
              headerTitle: tCommon('settings') + '',
              headerTitleStyle: {
                color: theme.scheme === 'LIGHT' ? Typography.Primary : TypographyDark.Primary,
              },
              headerStyle: {
                backgroundColor: theme.scheme === 'LIGHT' ? Color.Background : ColorDark.Background,
              },
              headerBlurEffect: 'regular',
            }}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="CodeScan"
            component={QRCodeScanner}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SsoMy"
            component={SsoMy}
            options={{
              headerTitle: tCommon('myProfile') + '',
            }}
          />
        </Stack.Group>
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
