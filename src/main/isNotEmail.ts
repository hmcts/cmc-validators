import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from '@hmcts/class-validator'

import * as validator from 'validator'

@ValidatorConstraint()
export class IsNotEmailConstraint implements ValidatorConstraintInterface {

  validate (value: any, args: ValidationArguments): boolean {
    return (typeof value === 'string' && value.length !== 0 && !validator.isEmail(value)) || value.length === 0
  }
}

/**
 * Verify not an email address if the value is not empty.
 */
export function IsNotEmail (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsNotEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotEmailConstraint
    })
  }
}
