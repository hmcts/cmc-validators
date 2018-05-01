import { expect } from 'chai'
import { IsNotBlank } from '../main/isNotBlank'
import { validateSync } from 'class-validator'

class NotBlankTest {
  @IsNotBlank()
  value?: any

  constructor (value?: any) {
    this.value = value
  }
}

describe('IsNotBlank', () => {

  describe('validate', () => {

    describe('should return true when ', () => {

      it('given an undefined value', () => {
        expect(validateSync(new NotBlankTest(undefined))).to.be.empty
      })

      it('given ab non blank value', () => {
        expect(validateSync(new NotBlankTest('Something'))).to.be.empty
      })
    })

    describe('should return false when ', () => {

      it('given an non string value', () => {
        expect(validateSync(new NotBlankTest(true))).to.not.be.empty
        expect(validateSync(new NotBlankTest(999))).to.not.be.empty
        expect(validateSync(new NotBlankTest({}))).to.not.be.empty
      })

      it('given an empty value', () => {
        expect(validateSync(new NotBlankTest(''))).to.not.be.empty
      })

      it('given an blank value', () => {
        expect(validateSync(new NotBlankTest(' '))).to.not.be.empty
      })

    })
  })

})
