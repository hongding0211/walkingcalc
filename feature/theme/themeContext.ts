import { createContext } from 'react'

export const ThemeContext = createContext<ColorScheme>({
  scheme: 'LIGHT',
})
