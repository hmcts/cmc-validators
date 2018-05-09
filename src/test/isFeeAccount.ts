import { expect } from 'chai'
import { IsFeeAccount } from '../main/isFeeAccount'
import { validateSync } from 'class-validator'

class IsFeeAccountTest {
  @IsFeeAccount()
  value: any

  constructor (value: any) {
    this.value = value
  }
}

describe('IsFeeAccount', () => {

  describe('validate', () => {
    describe('should return true when', () => {
      it('given an valid reference ', () => {
        expect(validateSync(new IsFeeAccountTest('PBA1234567'))).to.be.empty
      })

      it('given an valid reference in lower case', () => {
        expect(validateSync(new IsFeeAccountTest('pba1234567'))).to.be.empty
      })

      it('given an valid reference with leading spaces', () => {
        expect(validateSync(new IsFeeAccountTest('   PBA1234567'))).to.be.empty
      })

      it('given an valid reference with trailing spaces', () => {
        expect(validateSync(new IsFeeAccountTest('PBA1234567  '))).to.be.empty
      })

      it('given null', () => {
        expect(validateSync(new IsFeeAccountTest(null))).to.be.empty
      })

      it('given undefined', () => {
        expect(validateSync(new IsFeeAccountTest(undefined))).to.be.empty
      })
    })

    describe('should return false when ', () => {

      it('given an empty string', () => {
        expect(validateSync(new IsFeeAccountTest(''))).to.not.be.empty
      })

      it('given an invalid reference prefix', () => {
        expect(validateSync(new IsFeeAccountTest('aaa1234567'))).to.not.be.empty
      })

      it('given an invalid digit suffix', () => {
        expect(validateSync(new IsFeeAccountTest('PBA123456d'))).to.not.be.empty
      })

      it('given an invalid length for digit suffix', () => {
        expect(validateSync(new IsFeeAccountTest('PBA123456789'))).to.not.be.empty
      })

      it('given a number', () => {
        expect(validateSync(new IsFeeAccountTest(1231234567))).to.not.be.empty
      })

      it('given a character string', () => {
        expect(validateSync(new IsFeeAccountTest('PBAabcdefg'))).to.not.be.empty
      })

      it('given an object', () => {
        expect(validateSync(new IsFeeAccountTest({}))).to.not.be.empty
      })

    })
  })
})
