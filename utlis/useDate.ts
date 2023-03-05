import dayjs from 'dayjs'

export function useDate() {
  return {
    date: (time: number) => {
      // TODO internation
      return dayjs(time).format('MM月DD日')
    },
    fullDate: (time: number) => {
      return dayjs(time).format('YYYY年MM月DD日')
    },
    time: (time: number) => {
      return dayjs(time).format('MM月DD日 HH:mm')
    },
  }
}
