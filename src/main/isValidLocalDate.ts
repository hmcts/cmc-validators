import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

import { LocalDate } from './interface/date'

const EXPECTED_YEAR_LENGTH: number = 4

@ValidatorConstraint()
export class IsValidLocalDateConstraint implements ValidatorConstraintInterface {

  validate (value: any | LocalDate, args: ValidationArguments): boolean {
    if (value == null) {
      return true
    }

    if (!value.toMoment || !value.year) {
      return false
    }

    return Number(value.year).toString().length === EXPECTED_YEAR_LENGTH && value.toMoment().isValid()

  }

}

/**
 * Verify is a valid local date.
 */
export function IsValidLocalDate (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidLocalDateConstraint
    })
  }
}
