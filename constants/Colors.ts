export enum Color {
  Primary = '#316FE2',
  Second = '#ADADAD',
  Third = '#E4E4E4',
  Fourth = '#f1f1f1',
  Danger = '#F7524A',
  Success = '#33A81C',
  Gold = '#F8D03A',
  Background = '#FFFFFF',
  BackgroundSecond = '#F6F6F8',
  Highlight = '#E0E0E0',
}

export enum Typography {
  Primary = '#212222',
  Second = '#ADADAD',
}

export enum ColorDark {
  Primary = '#316FE2',
  Second = '#999999',
  Third = '#2f2f2f',
  Fourth = '#212121',
  Background = '#181818',
  BackgroundSecond = '#000000',
  Highlight = '#222222',
}

export enum TypographyDark {
  Primary = '#FFFFFF',
  Second = '#999999',
}

export enum AvatarColorPalettes {
  '#5AC1F5',
  '#86CC56',
  '#FF8C8D',
  '#F05A4A',
  '#81DBDA',
}

export const DefaultThemeColorId: ThemeColorId = 'blue'

export const ThemeColorOptions: ThemeColorOption[] = [
  {
    id: 'blue',
    label: 'Blue',
    color: Color.Primary,
  },
  {
    id: 'green',
    label: 'Green',
    color: '#22A06B',
  },
  {
    id: 'rose',
    label: 'Rose',
    color: '#E0527C',
  },
  {
    id: 'gold',
    label: 'Gold',
    color: Color.Gold,
    darkColor: '#C99700',
  },
]

export const getThemeColorOption = (id?: string | null): ThemeColorOption => {
  return (
    ThemeColorOptions.find(option => option.id === id) ||
    ThemeColorOptions.find(option => option.id === DefaultThemeColorId) ||
    ThemeColorOptions[0]
  )
}
