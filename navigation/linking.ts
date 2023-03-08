import * as Linking from 'expo-linking'

const prefix = Linking.createURL('/')

const config = {
  screens: {
    Home: '/',
    Group: 'group/:groupId?/:join?',
    Login: 'login',
    SSO: '/login/sso',
  },
}

const linking = {
  prefixes: [prefix],
  config,
}

export default linking
