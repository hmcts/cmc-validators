import { expect } from 'chai'
import { ExtraFormFieldsArePopulated } from '../main/extraFormFieldsArePopulated'
import { validateSync } from 'class-validator'

class ExtraFormFieldsArePopulatedTest {
  @ExtraFormFieldsArePopulated(['field1', 'field2'])
  field1: any
  field2: any

  constructor (field1: any, field2?: any) {
    this.field1 = field1
    this.field2 = field2
  }
}

describe('ExtraFormFieldsArePopulatedConstraint', () => {

  describe('validate', () => {

    describe('should return true when', () => {
      it('all fields are populated', () => {
        expect(validateSync(new ExtraFormFieldsArePopulatedTest('Filled', 'Filled'))).to.be.empty
      })
    })

    describe('should return false when', () => {
      it('first field is unpopulated', () => {
        expect(validateSync(new ExtraFormFieldsArePopulatedTest(undefined, 'Filled'))).to.not.be.empty
      })

      it('last field in unpopulated', () => {
        expect(validateSync(new ExtraFormFieldsArePopulatedTest('Filled', undefined))).to.not.be.empty
      })

      it('all fields are filled with empty strings', () => {
        expect(validateSync(new ExtraFormFieldsArePopulatedTest('', ''))).to.not.be.empty
      })

      it('all fields are undefined', () => {
        expect(validateSync(new ExtraFormFieldsArePopulatedTest(undefined, undefined))).to.not.be.empty
      })
    })
  })
})
