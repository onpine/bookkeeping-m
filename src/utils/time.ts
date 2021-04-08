import dayjs from 'dayjs'

export const getFormat1 = (value: Date) => {
  return dayjs(value).format('YYYY年MM月DD日 HH:mm')
}