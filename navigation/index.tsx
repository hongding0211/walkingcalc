import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { useAppSelector } from '../app/store'
import useUser from '../feature/user/useUser'
import Home from '../screens/Home'
import Splash from '../screens/Splash'
import Login from '../screens/login/Login'
import SSO from '../screens/modal/login/SSO'

const LoginScreen: React.FC = () => {
  const Stack = createNativeStackNavigator()

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
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
      />
    </Tab.Navigator>
  )
}

const Navigation: React.FC = () => {
  useUser()
  const { isLogin, isLoginComplete } = useAppSelector(state => state.user)

  if (!isLoginComplete) {
    return <Splash />
  }

  return <NavigationContainer>{!isLogin ? <LoginScreen /> : <RootScreen />}</NavigationContainer>
}

export default Navigation
