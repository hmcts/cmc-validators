import { expect } from 'chai'
import { IsValidLocalDate } from '../main/isValidLocalDate'
import { LocalDate } from '../main/interface/date'
import * as moment from 'moment'
import { validateSync } from '@hmcts/class-validator'

class ValidLocalDateTest {
  @IsValidLocalDate()
  value: any

  constructor (value: any) {
    this.value = value
  }
}

class LocalDateImpl implements LocalDate {
  day: any
  month: any
  year: any

  constructor (day: any, month: any, year: any) {
    this.day = day
    this.month = month
    this.year = year
  }

  toMoment (): moment.Moment {
    return moment(`${this.year}-${this.month}-${this.day}`)
  }
}

describe('IsValidLocalDate', () => {

  describe('validate', () => {
    it('should accept undefined value', () => {
      expect(validateSync(new ValidLocalDateTest(undefined))).to.be.empty
    })

    it('should accept null value', () => {
      expect(validateSync(new ValidLocalDateTest(null))).to.be.empty
    })

    it('should reject values other then LocalDate', () => {
      expect(validateSync(new ValidLocalDateTest({}))).to.not.be.empty
    })

    it('should reject incomplete dates', () => {
      expect(validateSync(new ValidLocalDateTest(new LocalDateImpl(undefined, 1, 1992)))).to.not.be.empty
    })

    it('should reject non existing dates', () => {
      expect(validateSync(new ValidLocalDateTest(new LocalDateImpl(1, 13, 2000)))).to.not.be.empty
    })

    it('should accept valid dates', () => {
      expect(validateSync(new ValidLocalDateTest(new LocalDateImpl(28, 6, 1969)))).to.be.empty
    })

    it('should reject a year with less that 4 digits', () => {
      expect(validateSync(new ValidLocalDateTest(new LocalDateImpl(1, 1, 11)))).to.not.be.empty
    })

  })
})
