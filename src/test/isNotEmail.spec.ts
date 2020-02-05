import { IsNotEmail } from '../main/isNotEmail'
import { expect } from 'chai'
import { validateSync } from '@hmcts/class-validator'

class NotEmailTest {
  @IsNotEmail()
  value: any

  constructor (value: any) {
    this.value = value
  }
}

const validContactNames = [
  'test',
  'first name',
  'first middle last'
]

const invalidContactNames = [
  'email@domain.com',
  'email@domain.COM',
  'firstname.lastname@domain.com',
  'firstname.o\'lastname@domain.com',
  'email@subdomain.domain.com',
  'firstname+lastname@domain.com',
  '1234567890@domain.com',
  'email@domain-one.com',
  '_______@domain.com'
]

describe('IsNotEmail', () => {
  describe('should have no validation errors when', () => {
    context('given a valid email address', () => {
      validContactNames.forEach(name => {
        it(name, () => {
          expect(validateSync(new NotEmailTest(name)), name).to.be.empty
        })
      })
    })

    it('given an empty string', () => {
      expect(validateSync(new NotEmailTest(''))).to.be.empty
    })
  })
  describe('should have a validation error when', () => {
    context('given an email address', () => {
      invalidContactNames.forEach(address => {
        it(address, () => {
          expect(validateSync(new NotEmailTest(address))).to.not.be.empty
        })
      })
    })

    it('given a number', () => {
      expect(validateSync(new NotEmailTest(123))).to.be.empty
    })

    it('given an object', () => {
      expect(validateSync(new NotEmailTest({}))).to.be.empty
    })

    it('given null', () => {
      expect(validateSync(new NotEmailTest(null))).to.be.empty
    })

    it('given undefined', () => {
      expect(validateSync(new NotEmailTest(undefined))).to.be.empty
    })
  })
})
