import { expect } from 'chai'
import { IsValidLocalDate } from '../main/isValidLocalDate'
import { LocalDate } from '../main/interface/date'
import * as moment from 'moment'
import { validateSync } from 'class-validator'

class ValidLocalDateTest {
  @IsValidLocalDate()
  value: any

  constructor (value: any) {
    this.value = value
  }
}

class LocalDateImpl implements LocalDate {
  value: string

  constructor (value: string) {
    this.value = value
  }
  toMoment (): moment.Moment {
    return moment(this.value)
  }
}

describe('IsValidLocalDateConstraint', () => {

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
      expect(validateSync(new ValidLocalDateTest(new LocalDateImpl('01-1992')))).to.not.be.empty
    })

    it('should reject non existing dates', () => {
      expect(validateSync(new ValidLocalDateTest(new LocalDateImpl('13-01-2000')))).to.not.be.empty
    })

    it('should accept valid dates', () => {
      let errors = validateSync(new ValidLocalDateTest(new LocalDateImpl('06-28-1969')))
      expect(errors).to.be.empty
    })
  })
})
