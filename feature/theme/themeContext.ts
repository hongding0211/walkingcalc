import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useColorScheme } from 'react-native'

import {
  DefaultThemeColorId,
  ThemeColorOptions,
  getThemeColorOption,
} from '../../constants/Colors'

export const ThemeColorStorageKey = 'walkingcalc.themeColor'

export const ThemeContext = createContext<ColorScheme>({
  scheme: 'LIGHT',
  themeColor: DefaultThemeColorId,
  primaryColor: getThemeColorOption(DefaultThemeColorId).color,
  themeColorOptions: ThemeColorOptions,
  setThemeColor: () => undefined,
})

interface IThemeProvider {
  children: ReactNode
}

export const ThemeProvider: React.FC<IThemeProvider> = ({ children }) => {
  const colorScheme = useColorScheme()
  const [themeColor, setThemeColorState] =
    useState<ThemeColorId>(DefaultThemeColorId)

  useEffect(() => {
    let isMounted = true

    AsyncStorage.getItem(ThemeColorStorageKey)
      .then(storedThemeColor => {
        if (!isMounted) {
          return
        }

        setThemeColorState(getThemeColorOption(storedThemeColor).id)
      })
      .catch(() => undefined)

    return () => {
      isMounted = false
    }
  }, [])

  const setThemeColor = useCallback((nextThemeColor: ThemeColorId) => {
    const option = getThemeColorOption(nextThemeColor)

    setThemeColorState(option.id)
    AsyncStorage.setItem(ThemeColorStorageKey, option.id).catch(() => undefined)
  }, [])

  const activeThemeColor = getThemeColorOption(themeColor)
  const scheme = colorScheme === 'light' ? 'LIGHT' : 'DARK'
  const primaryColor =
    scheme === 'DARK'
      ? activeThemeColor.darkColor || activeThemeColor.color
      : activeThemeColor.color

  const value = useMemo<ColorScheme>(
    () => ({
      scheme,
      themeColor: activeThemeColor.id,
      primaryColor,
      themeColorOptions: ThemeColorOptions,
      setThemeColor,
    }),
    [activeThemeColor.id, primaryColor, scheme, setThemeColor]
  )

  return React.createElement(ThemeContext.Provider, { value }, children)
}
