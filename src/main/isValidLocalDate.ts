import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

import { LocalDate } from './interface/date'

@ValidatorConstraint()
export class IsValidLocalDateConstraint implements ValidatorConstraintInterface {

  validate (value: any | LocalDate, args?: ValidationArguments): boolean {
    if (value == null) {
      return true
    }

    if (!value.toMoment) {
      return false
    }

    return value.toMoment().isValid()
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
