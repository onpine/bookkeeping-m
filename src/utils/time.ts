import dayjs from 'dayjs'
var customParseFormat = require('dayjs/plugin/customParseFormat')

export const getFormat1 = (value: Date) => {
  return dayjs(value).format('YYYY年MM月DD日 HH:mm')
}

export const isToday = (value: any) => {
  dayjs.extend(customParseFormat)
  return dayjs().isSame(dayjs(value, "YYYY年MM月DD日 HH:mm"), 'day')
}

export const isMonth = (value: any) => {
  dayjs.extend(customParseFormat)
  return dayjs().isSame(dayjs(value, "YYYY年MM月DD日 HH:mm"), 'month')
}