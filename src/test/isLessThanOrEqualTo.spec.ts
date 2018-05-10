import { expect } from 'chai'
import { IsLessThanOrEqualTo } from '../main/isLessThanOrEqualTo'
import { validateSync } from 'class-validator'

const TARGET_VALUE: number = 200

class LessThanOrEqualTest {
  @IsLessThanOrEqualTo('targetValue')
  value?: any
  targetValue: number = TARGET_VALUE

  constructor (value: any, target: any) {
    this.value = value
    this.targetValue = target
  }
}

describe('IsLessThanOrEqualTo', () => {

  describe('validate', () => {

    describe('should return no error when', () => {

      it('given an undefined value', () => {
        expect(validateSync(new LessThanOrEqualTest(undefined, TARGET_VALUE))).to.be.empty
      })

      it('given a value less than relatedProperty', () => {
        expect(validateSync(new LessThanOrEqualTest(TARGET_VALUE - 1, TARGET_VALUE))).to.be.empty
      })

      it('given an equal value', () => {
        expect(validateSync(new LessThanOrEqualTest(TARGET_VALUE, TARGET_VALUE))).to.be.empty
      })

      it('given a NaN target value value', () => {
        expect(validateSync(new LessThanOrEqualTest(TARGET_VALUE, NaN))).to.be.empty
      })

    })

    describe('should return an error when', () => {

      it('given a greater value', () => {
        expect(validateSync(new LessThanOrEqualTest(TARGET_VALUE + 1, TARGET_VALUE))).to.not.be.empty
      })
    })
  })
})
