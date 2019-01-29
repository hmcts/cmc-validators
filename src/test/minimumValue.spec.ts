import { expect } from 'chai'
import { Min } from '../main/minimumValue'
import { validateSync } from '@hmcts/class-validator'

const MINIMUM_VALUE: number = 200

class MinimumValueTest {
  @Min(MINIMUM_VALUE)
  value: any

  constructor (value?: any) {
    this.value = value
  }
}

describe('Min', () => {

  describe('validate', () => {

    context('should return no error when', () => {

      it('given an undefined value', () => {
        expect(validateSync(new MinimumValueTest(undefined))).to.be.empty
      })

      it('given value is greater than min value', () => {
        expect(validateSync(new MinimumValueTest(MINIMUM_VALUE + 1))).to.be.empty
      })

      it('given value is equal than min value', () => {
        expect(validateSync(new MinimumValueTest(MINIMUM_VALUE))).to.be.empty
      })
    })

    context('should return a validation error when', () => {

      it('given value is lower than min value', () => {
        expect(validateSync(new MinimumValueTest(MINIMUM_VALUE - 1))).to.not.be.empty
      })
    })
  })
})
