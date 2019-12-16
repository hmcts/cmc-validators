import { expect } from 'chai'
import { IsEmail } from '../main/isEmail'
import { validateSync } from '@hmcts/class-validator'

class EmailTest {
  @IsEmail()
  value: any

  constructor (value: any) {
    this.value = value
  }
}

const validEmailAddresses = [
  'email@domain.com',
  'email@domain.COM',
  'firstname.lastname@domain.com',
  'firstname.o\'lastname@domain.com',
  'email@subdomain.domain.com',
  'firstname+lastname@domain.com',
  '1234567890@domain.com',
  'email@domain-one.com',
  '_______@domain.com',
  'email@domain.name',
  'email@domain.superlongtld',
  'email@domain.co.jp',
  'firstname-lastname@domain.com',
  'info@german-financial-services.vermögensberatung',
  'info@german-financial-services.reallylongarbitrarytldthatiswaytoohugejustincase',
  'japanese-info@例え.テスト'
]

const invalidEmailAddresses = [
  'email@123.123.123.123',
  'email@[123.123.123.123]',
  'plainaddress',
  '@no-local-part.com',
  'Outlook Contact <outlook-contact@domain.com>',
  'no-at.domain.com',
  'no-tld@domain',
  ';beginning-semicolon@domain.co.uk',
  'middle-semicolon@domain.co;uk',
  'trailing-semicolon@domain.com;',
  '"email+leading-quotes@domain.com',
  'email+middle"-quotes@domain.com',
  '"quoted-local-part"@domain.com',
  '"quoted@domain.com"',
  'lots-of-dots@domain..gov..uk',
  'two-dots..in-local@domain.com',
  'multiple@domains@domain.com',
  'spaces in local@domain.com',
  'spaces-in-domain@dom ain.com',
  'underscores-in-domain@dom_ain.com',
  'pipe-in-domain@example.com|gov.uk',
  'comma,in-local@gov.uk',
  'comma-in-domain@domain,gov.uk',
  'pound-sign-in-local£@domain.com',
  'local-with-’-apostrophe@domain.com',
  'local-with-”-quotes@domain.com',
  'domain-starts-with-a-dot@.domain.com',
  'brackets(in)local@domain.com',
  'email-too-long-' + 'a'.repeat(320) + '@example.com'
]

describe('IsEmail', () => {
  describe('should have no validation errors when', () => {
    context('given a valid email address', () => {
      validEmailAddresses.forEach(address => {
        it(address, () => {
          expect(validateSync(new EmailTest(address)), address).to.be.empty
        })
      })
    })

    it('given an empty string', () => {
      expect(validateSync(new EmailTest(''))).to.be.empty
    })
  })

  describe('should have a validation error when', () => {
    context('given an invalid email address', () => {
      invalidEmailAddresses.forEach(address => {
        it(address, () => {
          expect(validateSync(new EmailTest(address))).to.not.be.empty
        })
      })
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

    it('given undefined', () => {
      expect(validateSync(new EmailTest(undefined))).to.not.be.empty
    })
  })
})
