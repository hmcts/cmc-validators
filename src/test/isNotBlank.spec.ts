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
        expect(validateSync(new NotBlankTest(undefined))).to.be.length(0)
      })

      it('given ab non blank value', () => {
        expect(validateSync(new NotBlankTest('Something'))).to.be.length(0)
      })
    })

    describe('should return false when ', () => {

      it('given an non string value', () => {
        expect(validateSync(new NotBlankTest(true))).to.be.length(1)
        expect(validateSync(new NotBlankTest(999))).to.be.length(1)
        expect(validateSync(new NotBlankTest({}))).to.be.length(1)
      })

      it('given an empty value', () => {
        expect(validateSync(new NotBlankTest(''))).to.be.length(1)
      })

      it('given an blank value', () => {
        expect(validateSync(new NotBlankTest(' '))).to.be.length(1)
      })

    })
  })

})
