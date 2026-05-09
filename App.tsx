import * as Notifications from 'expo-notifications'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import store from './app/store'
import Loading from './components/General/Loading'
import Toast from './components/Toast'
import { LangContext } from './feature/lang/langContext'
import { ThemeProvider } from './feature/theme/themeContext'
import useCachedResources from './hooks/useCachedResources'
import './i18n'
import Navigation from './navigation'
import getLocales from './utils/locales'

const locales = getLocales()

export default function App() {
  const isLoadingComplete = useCachedResources()

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
        <ThemeProvider>
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
        </ThemeProvider>
      </SafeAreaProvider>
    )
  }
}
