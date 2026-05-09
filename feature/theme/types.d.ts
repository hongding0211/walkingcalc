type ThemeColorId = 'blue' | 'green' | 'rose' | 'gold'

interface ThemeColorOption {
  id: ThemeColorId
  label: string
  color: string
  darkColor?: string
}

interface ColorScheme {
  scheme: 'LIGHT' | 'DARK'
  themeColor: ThemeColorId
  primaryColor: string
  themeColorOptions: ThemeColorOption[]
  setThemeColor: (themeColor: ThemeColorId) => void
}
