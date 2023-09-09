import * as Notifications from 'expo-notifications'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import store from './app/store'
import Loading from './components/General/Loading'
import Toast from './components/Toast'
import { LangContext } from './feature/lang/langContext'
import { ThemeContext } from './feature/theme/themeContext'
import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'
import './i18n'
import getLocales from './utlis/locales'

const locales = getLocales()

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  Notifications.getPermissionsAsync()
    .then(res => {
      if (res.status !== 'undetermined') {
        return
      }
      return Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
        },
      })
    })
    .then()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <ThemeContext.Provider value={{ scheme: colorScheme === 'light' ? 'LIGHT' : 'DARK' }}>
          <LangContext.Provider value={locales}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Provider store={store}>
                <StatusBar />
                <Navigation />
                <Loading />
                <Toast />
              </Provider>
            </GestureHandlerRootView>
          </LangContext.Provider>
        </ThemeContext.Provider>
      </SafeAreaProvider>
    )
  }
}
