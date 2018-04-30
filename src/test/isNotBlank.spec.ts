import { expect } from 'chai'
import { IsNotBlankConstraint } from '../main/isNotBlank'

describe('IsNotBlank', () => {
  const constraint: IsNotBlankConstraint = new IsNotBlankConstraint()

  describe('validate', () => {

    describe('should return true when ', () => {

      it('given an undefined value', () => {
        expect(constraint.validate(undefined)).to.be.equal(true)
      })

      it('given ab non blank value', () => {
        expect(constraint.validate('something')).to.be.equal(true)
      })
    })

    describe('should return false when ', () => {

      it('given an non string value', () => {
        expect(constraint.validate(true)).to.be.equal(false)
        expect(constraint.validate(999)).to.be.equal(false)
        expect(constraint.validate({})).to.be.equal(false)
      })

      it('given an empty value', () => {
        expect(constraint.validate('')).to.be.equal(false)
      })

      it('given an blank value', () => {
        expect(constraint.validate(' ')).to.be.equal(false)
      })

    })
  })

})
