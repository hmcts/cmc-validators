import { expect } from 'chai'
import { IsBooleanTrue } from '../main/isBooleanTrue'
import { validateSync } from 'class-validator'

class BooleanTrueTest {
  @IsBooleanTrue()
  boolValue?: any

  constructor (boolValue?: any) {
    this.boolValue = boolValue
  }
}

describe('IsBooleanTrue', () => {

  describe('validate', () => {

    describe('should return true when ', () => {
      it('given a valid case', () => {
        expect(validateSync(new BooleanTrueTest(true))).to.length(0)
      })
    })

    describe('should return false when ', () => {
      it('given an invalid case', () => {
        expect(validateSync(new BooleanTrueTest(false))).to.length(1)
      })
      it('given null', () => {
        expect(validateSync(new BooleanTrueTest(null))).to.length(1)
      })
      it('given undefined', () => {
        expect(validateSync(new BooleanTrueTest(undefined))).to.length(1)
      })
    })
  })
})
