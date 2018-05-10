import { expect } from 'chai'
import { IsMobilePhoneNumber } from '../main/isMobilePhoneNumber'
import { validateSync } from 'class-validator'

class MobilePhoneNumberTest {
  @IsMobilePhoneNumber()
  value: any

  constructor (value: any) {
    this.value = value
  }
}

/**
 * The tests below are aligned to what GOV.UK Notify is accepting and not how we would like to validate phone numbers.
 */
describe('IsMobilePhoneNumber', () => {

  describe('validate', () => {
    describe('for land line numbers', () => {
      it('should return false when given a valid land line number', () => {
        expect(validateSync(new MobilePhoneNumberTest('+44 (0203) 334 3555'))).to.not.be.empty
      })

      it('should return false when given an invalid land line number', () => {
        expect(validateSync(new MobilePhoneNumberTest('+44 (0203) 3555'))).to.not.be.empty
      })
    })

    describe('for mobile numbers starting with 0', () => {
      it('valid number should return true', () => {
        expect(validateSync(new MobilePhoneNumberTest('07873738547'))).to.be.empty
      })

      it('valid number with spaces should return true', () => {
        expect(validateSync(new MobilePhoneNumberTest('0 787 373 8547'))).to.be.empty
      })

      it('valid number with dashes should return true', () => {
        expect(validateSync(new MobilePhoneNumberTest('0-787-373-8547'))).to.be.empty
      })

      it('valid number with parentheses should return true', () => {
        expect(validateSync(new MobilePhoneNumberTest('(0) 7873738547'))).to.be.empty
      })

      it('valid number starting with # should return false', () => {
        expect(validateSync(new MobilePhoneNumberTest('#07873738547'))).to.not.be.empty
      })

      it('too short number should return false', () => {
        expect(validateSync(new MobilePhoneNumberTest('078737385'))).to.not.be.empty
      })

      it('too long number should return false', () => {
        expect(validateSync(new MobilePhoneNumberTest('078737385789'))).to.not.be.empty
      })
    })

    describe('for numbers with invalid characters', () => {
      it('should return false if the string is of length 10', () => {
        expect(validateSync(new MobilePhoneNumberTest('#$%^&$%^&*'))).to.not.be.empty
      })

      it('should return true if the string contains a valid number with valid characters in between', () => {
        expect(validateSync(new MobilePhoneNumberTest('0+7)8-7(3)7+3-8-5--4(7'))).to.be.empty
      })
    })

    describe('for numbers with international code', () => {
      it('valid number that starts with 00 44 code with spaces should return true', () => {
        expect(validateSync(new MobilePhoneNumberTest('00 44 7873738547'))).to.be.empty
      })

      it('valid number that starts with 0044 code should return true', () => {
        expect(validateSync(new MobilePhoneNumberTest('00447873738547'))).to.be.empty
      })

      it('valid number that starts with +44 code with spaces should return true', () => {
        expect(validateSync(new MobilePhoneNumberTest('+44 78 73 738547'))).to.be.empty
      })

      it('valid number that starts with +44 code should return true', () => {
        expect(validateSync(new MobilePhoneNumberTest('+447873738547'))).to.be.empty
      })

      it('valid number that is outside of uk (+48) should return false', () => {
        expect(validateSync(new MobilePhoneNumberTest('+487873738547'))).to.not.be.empty
      })

      it('valid number that is outside of uk (0048) should return false', () => {
        expect(validateSync(new MobilePhoneNumberTest('00487873738547'))).to.not.be.empty
      })

      it('invalid number that that starts with 0044 should return false', () => {
        expect(validateSync(new MobilePhoneNumberTest('0044123456'))).to.not.be.empty
      })

      it('invalid number that that starts with +44 should return false', () => {
        expect(validateSync(new MobilePhoneNumberTest('+441234567'))).to.not.be.empty
      })
    })

    describe('validation should pass when', () => {
      it('number is undefined', () => {
        expect(validateSync(new MobilePhoneNumberTest(undefined))).to.be.empty
      })
    })

    describe('validation should fail when', () => {
      it('number is not a number', () => {
        expect(validateSync(new MobilePhoneNumberTest('not a number'))).to.not.be.empty
      })

      it('number is null', () => {
        expect(validateSync(new MobilePhoneNumberTest(null))).to.not.be.empty
      })
    })
  })
})
