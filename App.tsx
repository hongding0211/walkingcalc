import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import store from './app/store'
import Loading from './components/General/Loading'
import { LangContext } from './feature/lang/langContext'
import { ThemeContext } from './feature/theme/themeContext'
import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'
import './i18n'

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
              <Loading />
            </Provider>
          </LangContext.Provider>
        </ThemeContext.Provider>
      </SafeAreaProvider>
    )
  }
}
