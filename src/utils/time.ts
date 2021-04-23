import dayjs from 'dayjs'
var customParseFormat = require('dayjs/plugin/customParseFormat')

export const getFormat1 = (value: Date) => {
  return dayjs(value).format('YYYY年MM月DD日 HH:mm')
}

export const isToday = (value: any) => {
  dayjs.extend(customParseFormat)

  return dayjs().isSame(dayjs(value, "YYYY年MM月DD日 HH:mm"), 'day')

}

export const isMonth = (value: any, value2?: any) => {
  dayjs.extend(customParseFormat)
  if (!value2) {
    return dayjs().isSame(dayjs(value, "YYYY年MM月DD日 HH:mm"), 'month')
  } else {
    return dayjs(value2).isSame(dayjs(value, "YYYY年MM月DD日 HH:mm"), 'month')
  }
}

export const getDays = (year: number, month: number) => {
  return new Date(year, month, 0).getDate()
}

export const getFormat = (value: any, format: string) => {
  return dayjs(value, format)
}