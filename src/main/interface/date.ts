import * as moment from 'moment'

export interface LocalDate {
  day: number
  month: number
  year: number
  toMoment (): moment.Moment
}
