import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import store from './app/store'
import { ThemeContext } from './feature/theme/themeContext'
import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'
import './i18n'
import { LangContext } from './feature/lang/langContext'

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <ThemeContext.Provider value={{ scheme: colorScheme === 'light' ? 'LIGHT' : 'DARK' }}>
          <LangContext.Provider value="cn">
            <Provider store={store}>
              <StatusBar />
              <Navigation />
            </Provider>
          </LangContext.Provider>
        </ThemeContext.Provider>
      </SafeAreaProvider>
    )
  }
}
