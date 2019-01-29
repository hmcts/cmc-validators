import { expect } from 'chai'

import { MinTotal } from '../main/minimumTotal'
import { validateSync } from '@hmcts/class-validator'

const TARGET_VALUE = 100

class TestMinimumTotalConstant {
  @MinTotal(TARGET_VALUE)
  values = [ { amount: 0 } ]

  constructor (amount: number) {
    this.values[0].amount = amount
  }
}

class TestMinimumTotal {
  @MinTotal('minTotal')
  values: any[] = []
  minTotal: number = 20

  constructor (minTotal: any, ...args: any[]) {
    this.minTotal = minTotal
    for (let arg of args) {
      this.values.push({ amount: arg })
    }
  }
}

class BadTestMinimumTotal {
  @MinTotal(TARGET_VALUE)
  value = {}
}

class UndefinedMinimumTotal {
  @MinTotal(0.1)
  value = undefined
}

describe('Minimum Total', () => {

  describe('validate', () => {
    describe('should raise an error when', () => {
      it('not given the minimal amount', () => {
        expect(() => validateSync(new TestMinimumTotal(null, 10))).to.throw(Error, 'Minimal required value parameter not given')
      })

      it('given non-numeric minimal amount', () => {
        expect(() => validateSync(new TestMinimumTotal('Not a number', 10))).to.throw(Error, 'Minimal required value parameter not given')
      })

      it('given empty value object', () => {
        expect(() => validateSync(new BadTestMinimumTotal())).to.throw('Expected validated element to be an array')
      })
    })

    describe('when using a constant minimum amount', () => {
      it('should validate when given a value equal to the minimum', () => {
        expect(validateSync(new TestMinimumTotalConstant(TARGET_VALUE))).to.be.empty
      })
      it('should validate when given a value exceeding the minimum', () => {
        expect(validateSync(new TestMinimumTotalConstant(TARGET_VALUE + 1))).to.be.empty
      })
      it('should not validate when given a value under the minimum', () => {
        expect(validateSync(new TestMinimumTotalConstant(TARGET_VALUE - 1))).to.not.be.empty
      })
    })

    describe('given an arbitrary minimal amount', () => {
      it('should return true when the value equal to the minimal', () => {
        expect(validateSync(new TestMinimumTotal(50, 25, 25))).to.be.empty
      })

      it('should return true when the value more than the minimal', () => {
        expect(validateSync(new TestMinimumTotal(100,25, 25, 25, 25, 25))).to.be.empty
      })

      it('should return false when the value more less the minimal', () => {
        expect(validateSync(new TestMinimumTotal(99.9,90, 9.8))).to.not.be.empty
      })
    })

    describe('given 0 minimal amount', () => {
      it('should return true when empty array is given as input', () => {
        expect(validateSync(new TestMinimumTotal(0))).to.be.empty
      })
    })

    describe('should fail to validate when 0.1 is the minimum', () => {
      it('given empty array', () => {
        expect(validateSync(new TestMinimumTotal(0.1))).to.be.not.empty
      })

      it('given a single row with undefined amount', () => {
        expect(validateSync(new TestMinimumTotal(0.1, undefined))).to.be.not.empty
      })

      it('given a single row with negative amount', () => {
        expect(validateSync(new TestMinimumTotal(0.1, -10))).to.be.not.empty
      })

      it('given a single row with smaller decimal amount', () => {
        expect(validateSync(new TestMinimumTotal(0.001))).to.be.not.empty
      })

      it('given a single row with empty object as amount', () => {
        expect(validateSync(new TestMinimumTotal(0.1, {}))).to.be.not.empty
      })

      it('given a single row with garbage string as amount', () => {
        expect(validateSync(new TestMinimumTotal(0.1, 'definitely not a number'))).to.be.not.empty
      })
    })

    describe('should return true when 0.1 is the minimum', () => {

      it('given undefined input', () => {
        expect(validateSync(new UndefinedMinimumTotal())).to.be.empty
      })

      it('given a single row with required amount', () => {
        expect(validateSync(new TestMinimumTotal(0.1, 0.1))).to.be.empty
      })

      it('given row with a greater amount', () => {
        expect(validateSync(new TestMinimumTotal(0.1, 10))).to.be.empty
      })

      it('given a rows with single one with required amount', () => {
        expect(validateSync(new TestMinimumTotal(0.1, 0, 0.1, 0, 0))).to.be.empty
      })

      it('given a rows with mixed invalid values and one required amount', () => {
        expect(validateSync(new TestMinimumTotal(0.1, null, 0.1, undefined, 0))).to.be.empty
      })
    })
  })
})
