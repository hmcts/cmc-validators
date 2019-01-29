import { expect } from 'chai'
import { IsPhoneNumber } from '../main/isPhone'
import { validateSync } from '@hmcts/class-validator'

class PhoneNumberTest {
  @IsPhoneNumber()
  value: any

  constructor (value: any) {
    this.value = value
  }
}

describe('IsPhoneNumber', () => {
  describe('validate', () => {
    describe('for land line numbers', () => {
      it('should return true when given a valid 10 digit land line number', () => {
        expect(validateSync(new PhoneNumberTest('+44 (0203) 334 3555'))).to.be.empty
      })

      it('should return true when given a valid 9 digit land line number', () => {
        expect(validateSync(new PhoneNumberTest('+44 (0203) 334 355'))).to.be.empty
      })

      it('should return true when given an valid 7 digit land line number', () => {
        expect(validateSync(new PhoneNumberTest('+44 (0203) 3555'))).to.be.empty
      })

      it('should return false when given an invalid land line number', () => {
        expect(validateSync(new PhoneNumberTest('+44 (0203) 35559'))).to.not.be.empty
      })

      it('should return true when given a null phone number', () => {
        expect(validateSync(new PhoneNumberTest(null))).to.be.empty
      })
    })

    describe('for mobile numbers starting with 0', () => {
      it('valid number should return true', () => {
        expect(validateSync(new PhoneNumberTest('07873738547'))).to.be.empty
      })

      it('valid number with spaces should return true', () => {
        expect(validateSync(new PhoneNumberTest('0 787 373 8547'))).to.be.empty
      })

      it('valid number with dashes should return true', () => {
        expect(validateSync(new PhoneNumberTest('0-787-373-8547'))).to.be.empty
      })

      it('valid number with parentheses should return true', () => {
        expect(validateSync(new PhoneNumberTest('(0) 7873738547'))).to.be.empty
      })

      it('valid number starting with # should return false', () => {
        expect(validateSync(new PhoneNumberTest('#07873738547'))).to.not.be.empty
      })

      it('valid number starting with 00 should return false', () => {
        expect(validateSync(new PhoneNumberTest('00787373854'))).to.not.be.empty
      })

      it('too short number should return false', () => {
        expect(validateSync(new PhoneNumberTest('078737385'))).to.not.be.empty
      })

      it('too long number should return false', () => {
        expect(validateSync(new PhoneNumberTest('078737385789'))).to.not.be.empty
      })
    })

    describe('for numbers with invalid characters', () => {
      it('should return false if the string is of length 10', () => {
        expect(validateSync(new PhoneNumberTest('#$%^&$%^&*'))).to.not.be.empty
      })

      it('should return true if the string contains a valid number with valid characters in between', () => {
        expect(validateSync(new PhoneNumberTest('0+7)8-7(3)7+3-8-5--4(7'))).to.be.empty
      })

      it('should return false if the number is not string object', () => {
        expect(validateSync(new PhoneNumberTest(100))).to.not.be.empty
      })
    })

    describe('for numbers with international code', () => {
      it('valid number that starts with 00 44 code with spaces should return true', () => {
        expect(validateSync(new PhoneNumberTest('00 44 7873738547'))).to.be.empty
      })

      it('valid number that starts with 0044 code should return true', () => {
        expect(validateSync(new PhoneNumberTest('00447873738547'))).to.be.empty
      })

      it('valid number that starts with +44 code with spaces should return true', () => {
        expect(validateSync(new PhoneNumberTest('+44 78 73 738547'))).to.be.empty
      })

      it('valid number that starts with +44 code should return true', () => {
        expect(validateSync(new PhoneNumberTest('+447873738547'))).to.be.empty
      })

      it('valid number that is outside of uk (+48) should return false', () => {
        expect(validateSync(new PhoneNumberTest('+487873738547'))).to.not.be.empty
      })

      it('valid number that is outside of uk (0048) should return false', () => {
        expect(validateSync(new PhoneNumberTest('00487873738547'))).to.not.be.empty
      })

      it('invalid number that that starts with 0044 should return false', () => {
        expect(validateSync(new PhoneNumberTest('0044123456'))).to.not.be.empty
      })

      it('invalid number that that starts with +44 should return false', () => {
        expect(validateSync(new PhoneNumberTest('+4412345678'))).to.not.be.empty
      })
    })
  })
})
