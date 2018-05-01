import { expect } from 'chai'
import { IsLessThan } from '../main/isLessThan'
import { validateSync } from 'class-validator'

const TARGET_VALUE: number = 200

class LessThanTest {
  @IsLessThan('targetValue')
  value?: any
  targetValue: number = TARGET_VALUE

  constructor (value?: any) {
    this.value = value
  }
}

describe('IsLessThan', () => {
  describe('validate', () => {

    describe('should have no validation errors when ', () => {
      it('given an undefined value', () => {
        expect(validateSync(new LessThanTest())).to.length(0)
        expect(validateSync(new LessThanTest(undefined))).to.be.length(0)
      })

      it('given a value less than the target value', () => {
        expect(validateSync(new LessThanTest(TARGET_VALUE - 1))).to.be.length(0)
      })
    })

    describe('should return validation errors when ', () => {
      it('given an equal value to the target value', () => {
        expect(validateSync(new LessThanTest(TARGET_VALUE))).to.be.length(1)
      })

      it('given a greater value than the target value', () => {
        expect(validateSync(new LessThanTest(TARGET_VALUE + 1))).to.be.length(1)
      })
    })
  })
})
