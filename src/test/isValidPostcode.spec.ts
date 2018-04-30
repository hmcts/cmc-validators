import { expect } from 'chai'
import { IsValidPostcode } from '../main/isValidPostcode'
import { validateSync } from 'class-validator'

class ValidPostcodeTest {
  @IsValidPostcode()
  value?: any

  constructor (value?: any) {
    this.value = value
  }
}

describe('IsValidPostcodeConstraint', () => {

  describe('validate', () => {

    describe('should return true when ', () => {

      it('given an undefined value', () => {
        expect(validateSync(new ValidPostcodeTest(undefined))).to.be.length(0)
      })

      it('given an null value', () => {
        expect(validateSync(new ValidPostcodeTest(null))).to.be.length(0)
      })

      it('given a valid postcode in lowercase', () => {
        expect(validateSync(new ValidPostcodeTest('sw1h9aj'))).to.be.length(0)
      })

      it('given a valid postcode in uppercase', () => {
        expect(validateSync(new ValidPostcodeTest('SW1H9AJ'))).to.length(0)
      })

      it('given a valid postcode in mixed case', () => {
        expect(validateSync(new ValidPostcodeTest('Sw1H9aJ'))).to.length(0)
      })

      it('given a valid postcode in uppercase with space', () => {
        expect(validateSync(new ValidPostcodeTest('SW1H 9AJ'))).to.be.length(0)
      })

      describe('should return true for valid formats ', () => {

        it('given a valid postcode of format AN NAA', () => {
          expect(validateSync(new ValidPostcodeTest('M1 1AA'))).to.be.length(0)
        })

        it('given a valid postcode of format ANN NAA', () => {
          expect(validateSync(new ValidPostcodeTest('M60 1NW'))).to.be.length(0)
        })

        it('given a valid postcode of format AAN NAA', () => {
          expect(validateSync(new ValidPostcodeTest('CR2 6HX'))).to.be.length(0)
        })

        it('given a valid postcode of format AANN NAA', () => {
          expect(validateSync(new ValidPostcodeTest('DN55 1PT'))).to.be.length(0)
        })

        it('given a valid postcode of format ANA NAA', () => {
          expect(validateSync(new ValidPostcodeTest('W1A 0AX'))).to.be.length(0)
        })

        it('given a valid postcode of format AANA NAA', () => {
          expect(validateSync(new ValidPostcodeTest('EC1A 1BB'))).to.be.length(0)
        })
      })

    })

    describe('should return false when ', () => {
      it('given an invalid postcode', () => {
        expect(validateSync(new ValidPostcodeTest('aaaaa'))).to.be.length(1)
      })

      it('given a number', () => {
        expect(validateSync(new ValidPostcodeTest(123))).to.be.length(1)
      })

      it('given an object', () => {
        expect(validateSync(new ValidPostcodeTest({}))).to.be.length(1)
      })

      it('given an empty value', () => {
        expect(validateSync(new ValidPostcodeTest(''))).to.be.length(1)
      })
    })
  })
})
