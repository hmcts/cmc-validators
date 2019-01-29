import { expect } from 'chai'
import { IsBooleanTrue } from '../main/isBooleanTrue'
import { validateSync } from '@hmcts/class-validator'

class BooleanTrueTest {
  @IsBooleanTrue()
  boolValue?: any

  constructor (boolValue?: any) {
    this.boolValue = boolValue
  }
}

describe('IsBooleanTrue', () => {

  describe('validate', () => {

    describe('should return true when', () => {
      it('given a valid case', () => {
        expect(validateSync(new BooleanTrueTest(true))).to.be.empty
      })
    })

    describe('should return false when', () => {
      it('given an invalid case', () => {
        expect(validateSync(new BooleanTrueTest(false))).to.not.be.empty
      })
      it('given null', () => {
        expect(validateSync(new BooleanTrueTest(null))).to.not.be.empty
      })
      it('given undefined', () => {
        expect(validateSync(new BooleanTrueTest(undefined))).to.not.be.empty
      })
    })
  })
})
