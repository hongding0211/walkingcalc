import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import store from './app/store'
import { ThemeContext } from './feature/theme/themeContext'
import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <ThemeContext.Provider value={{ scheme: 'LIGHT' }}>
          <Provider store={store}>
            <StatusBar />
            <Navigation />
          </Provider>
        </ThemeContext.Provider>
      </SafeAreaProvider>
    )
  }
}
