import { expect } from 'chai'
import { IsEmail } from '../main/isEmail'
import { validateSync } from 'class-validator'

class EmailTest {
  @IsEmail()
  value: any

  constructor (value: any) {
    this.value = value
  }
}

describe('IsEmail', () => {

  describe('validate', () => {

    describe('should have no validation errors when', () => {
      it('given a valid email', () => {
        expect(validateSync(new EmailTest('my-test@example.com'))).to.be.empty
      })

      it('given an empty string', () => {
        expect(validateSync(new EmailTest(''))).to.be.empty
      })
    })

    describe('should have a validation error when', () => {
      it('given an invalid email (string)', () => {
        expect(validateSync(new EmailTest('aaaaa'))).to.not.be.empty
      })

      it('given a number', () => {
        expect(validateSync(new EmailTest(123))).to.not.be.empty
      })

      it('given an object', () => {
        expect(validateSync(new EmailTest({}))).to.not.be.empty
      })

      it('given null', () => {
        expect(validateSync(new EmailTest(null))).to.not.be.empty
      })
    })
  })
})
