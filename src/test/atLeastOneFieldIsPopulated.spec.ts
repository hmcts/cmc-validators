import { expect } from 'chai'

import { AtLeastOneFieldIsPopulated } from '../main/atLeastOneFieldIsPopulated'
import { validateSync } from '@hmcts/class-validator'

class AtLeastOneFieldIsPopulatedTest {
  @AtLeastOneFieldIsPopulated()
  value: any

  constructor (value?: any) {
    this.value = value
  }
}

describe('AtLeastOneFieldIsPopulatedConstraint', () => {

  describe('validate', () => {

    describe('should return true when', () => {

      it('undefined given', () => {
        expect(validateSync(new AtLeastOneFieldIsPopulatedTest(undefined))).to.be.empty
      })

      it('all fields are populated with positive numbers', () => {
        expect(validateSync(new AtLeastOneFieldIsPopulatedTest({ a: 1, b: 100, c: 1.1 }))).to.be.empty
      })

      it('all fields are populated with negative numbers', () => {
        expect(validateSync(new AtLeastOneFieldIsPopulatedTest({ a: -1, b: -100, c: -1.1 }))).to.be.empty
      })

      it('all fields are populated with blank strings', () => {
        expect(validateSync(new AtLeastOneFieldIsPopulatedTest({ a: '\t', b: '\n', c: '    ' }))).to.be.empty
      })

      it('all fields are populated with nested objects', () => {
        expect(validateSync(new AtLeastOneFieldIsPopulatedTest({ a: {}, b: [] }))).to.be.empty
      })

      it('only one field is populated', () => {
        expect(validateSync(new AtLeastOneFieldIsPopulatedTest({ a: 1, b: undefined, c: '' }))).to.be.empty
      })

      it('object has keys with special characters in name', () => {
        expect(validateSync(
          new AtLeastOneFieldIsPopulatedTest({ 'thi%s*my^^key': 1, b: undefined, c: '' }))).to.be.empty
      })
    })

    describe('should return false when', () => {

      it('empty strings given', () => {
        expect(validateSync(new AtLeastOneFieldIsPopulatedTest({ a: '', b: '', c: '' }))).to.not.be.empty
      })

      it('undefined values given', () => {
        expect(validateSync(
          new AtLeastOneFieldIsPopulatedTest({ a: undefined, b: undefined }))).to.not.be.empty
      })

      it('all field populated with zeros', () => {
        expect(validateSync(new AtLeastOneFieldIsPopulatedTest({ a: 0, b: 0, c: 0 }))).to.not.be.empty
      })

      it('empty object', () => {
        expect(validateSync(new AtLeastOneFieldIsPopulatedTest({}))).to.not.be.empty
      })
    })
  })
})
