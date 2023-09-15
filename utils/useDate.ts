import dayjs from 'dayjs'
import { useContext } from 'react'

import { LangContext } from '../feature/lang/langContext'

export function useDate() {
  const lang = useContext(LangContext)
  return {
    date: (time: number) => {
      if (lang === 'cn') {
        return dayjs(time).format('MM月DD日')
      } else {
        return dayjs(time).format('MM/DD')
      }
    },
    fullDate: (time: number) => {
      if (lang === 'cn') {
        return dayjs(time).format('YYYY年MM月DD日')
      } else {
        return dayjs(time).format('MM/DD/YYYY')
      }
    },
    time: (time: number) => {
      if (lang === 'cn') {
        return dayjs(time).format('MM月DD日 HH:mm')
      } else {
        return dayjs(time).format('MM/DD HH:mm')
      }
    },
  }
}
