import { expect } from 'chai'
import { IsLessThanOrEqualToSumOf, IsLessThanOrEqualToSumOfConstraint } from '../main/isLessThanOrEqualToSumOf'
import { validateSync, ValidationArguments } from 'class-validator'

const DEFAULT_SUM = 30
const DEFAULT_VALUE = 200

class LessThanOrEqualToSumTest {
  @IsLessThanOrEqualToSumOf('defaultSum', 'targetValue')
  value: any
  targetValue: number
  defaultSum: number

  constructor (value: any, sum: any, lessThan: any) {
    this.value = value
    this.defaultSum = sum
    this.targetValue = lessThan
  }
}

describe('IsLessThanOrEqualToSumOf', () => {

  describe('validate', () => {

    describe('should return true when ', () => {
      it('given an undefined value', () => {
        expect(validateSync(new LessThanOrEqualToSumTest(undefined, DEFAULT_SUM, DEFAULT_VALUE))).to.be.length(0)
      })

      it('given a value less than relatedProperty', () => {
        expect(validateSync(new LessThanOrEqualToSumTest(10, DEFAULT_SUM, DEFAULT_VALUE))).to.be.length(0)
      })

      it('given an undefined sum property', () => {
        expect(validateSync(new LessThanOrEqualToSumTest(10, undefined, DEFAULT_SUM))).to.be.length(0)
      })
    })

    describe('should return false when ', () => {
      it('given an undefined related property', () => {
        expect(validateSync(new LessThanOrEqualToSumTest(10, DEFAULT_SUM, undefined))).to.be.length(1)
      })

      it('given an equal value', () => {
        expect(validateSync(new LessThanOrEqualToSumTest(DEFAULT_VALUE, DEFAULT_SUM, DEFAULT_VALUE))).to.be.length(1)
      })

      it('given a greater value', () => {
        expect(validateSync(new LessThanOrEqualToSumTest(DEFAULT_VALUE + 1, DEFAULT_SUM, DEFAULT_VALUE))).to.be.length(1)
      })
    })
  })
})

describe('IsLessThanOrEqualToSumOfConstraint', () => {
  const args: ValidationArguments = {
    value: '',
    targetName: '',
    object: {},
    property: '',
    constraints: ['exampleConstraint']
  }
  describe('Should throw an error when ', () => {
    it('given less than two validation arguments', () => {
      expect(() => {
        new IsLessThanOrEqualToSumOfConstraint().validate(1, args)
      }).to.throw('Invalid number of arguments, got 1, expected 2')
    })
  })
})
