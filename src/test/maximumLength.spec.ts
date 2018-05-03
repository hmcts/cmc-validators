import { expect } from 'chai'
import { validateSync } from 'class-validator'
import { MaxLength } from '../main/maximumLength'

const TARGET_LENGTH: number = 10
const INVALID_LENGTH: number = -1

class MaxLengthTest {
  @MaxLength(TARGET_LENGTH)
  value: any

  constructor (value: any) {
    this.value = value
  }
}

class InvalidMaxLength {
  @MaxLength(INVALID_LENGTH)
  value: any = TARGET_LENGTH
}

describe('MaxLength', () => {

  describe('validate', () => {

    it('should throw exception when max length is < 0', () => {
      expect(() => {
        validateSync(new InvalidMaxLength())
      }).to.throw('Max length must be > 0')
    })

    context('should have no validation errors when', () => {
      it('given an undefined value', () => {
        expect(validateSync(new MaxLengthTest(undefined))).to.be.empty
      })

      it('given string is shorter than max length', () => {
        expect(validateSync(new MaxLengthTest('my text'))).to.be.empty
      })

      it('given empty string', () => {
        expect(validateSync(new MaxLengthTest(''))).to.be.empty
      })
    })

    describe('should have a validation error when', () => {
      it('given too long string', () => {
        expect(validateSync(new MaxLengthTest('01234567890123456789'))).to.not.be.empty
      })
    })
  })
})
