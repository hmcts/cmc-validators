import { expect } from 'chai'
import { Fractions } from '../main/fractions'
import { validateSync } from 'class-validator'

class FractionsTest {
  @Fractions('minValue', 'maxValue')
  value: any
  minValue: any
  maxValue: any

  constructor (value: any, minValue: any, maxValue: any) {
    this.minValue = minValue
    this.maxValue = maxValue
    this.value = value
  }
}

class FractionsConstantTest {
  @Fractions(0, 3)
  value: number

  constructor (value: number) {
    this.value = value
  }
}

describe('Fractions', () => {

  describe('validate', () => {

    describe('should have no validation errors when', () => {

      it('given undefined value', () => {
        expect(validateSync(new FractionsTest(undefined, 1,2))).to.be.empty
      })

      it('given a valid decimal up to three decimal places', () => {
        expect(validateSync(new FractionsTest(10.123, 0, 3))).to.be.empty
      })

      it('given a valid decimal with no decimal place', () => {
        expect(validateSync(new FractionsTest(10, 0,2))).to.be.empty
      })

      it('given a valid negative decimal with no decimal place', () => {
        expect(validateSync(new FractionsTest(-10, 0, 2))).to.be.empty
      })

      it('given a valid negative decimal up to two decimal places', () => {
        expect(validateSync(new FractionsTest(-10.12, 0, 2))).to.be.empty
      })

      it('when using a valid decimal against constant validation parameters', () => {
        expect(validateSync(new FractionsConstantTest(-10.12))).to.be.empty
      })

    })

    describe('should return false when', () => {

      it('given an more than allowed decimals', () => {
        expect(validateSync(new FractionsTest(10.12, 1, 1))).to.not.be.empty
      })

      it('given an less than allowed decimals', () => {
        expect(validateSync(new FractionsTest(10.1, 2,3))).to.not.be.empty
      })

      it('given negative number with less than allowed decimals', () => {
        expect(validateSync(new FractionsTest(-10.12, 3,8))).to.not.be.empty
      })

      it('when using an invalid decimal against constant validation parameters', () => {
        expect(validateSync(new FractionsConstantTest(-10.12123))).to.not.be.empty
      })

    })

    describe('should throw an error', () => {

      it('if min constraint is not set', () => {
        expect(() => validateSync(new FractionsTest(10.12, undefined, 2))).to.throw(
         'Fraction value parameters must be specified'
        )
      })

      it('if max constraint is not set', () => {
        expect(() => validateSync(new FractionsTest(10.12, 1, undefined))).to.throw(
         'Fraction value parameters must be specified'
        )
      })

      it('if min constraint is negative', () => {
        expect(() => validateSync(new FractionsTest(10.12, -1, 2))).to.throw(
         'Minimum allowed decimal places has to be specified and positive value'
        )
      })

      it('if max constraint is negative', () => {
        expect(() => validateSync(new FractionsTest(10.12, 1, -1))).to.throw(
         'Maximum allowed decimal places has to be specified and positive value'
        )
      })

      it('if min constraint is not set', () => {
        expect(() => validateSync(new FractionsTest(10.12, null, 2))).to.throw(
         'Fraction value parameters must be specified'
        )
      })

      it('if max constraint is not set', () => {
        expect(() => validateSync(new FractionsTest(10.12, 1, null))).to.throw(
         'Fraction value parameters must be specified'
        )
      })
    })
  })
})
