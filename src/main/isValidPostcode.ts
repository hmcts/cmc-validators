import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from '@hmcts/class-validator'

import * as validator from 'validator'

@ValidatorConstraint()
export class IsValidPostcodeConstraint implements ValidatorConstraintInterface {
  validate (value: any, args?: ValidationArguments): boolean {
    if (value === undefined || value === null || args === undefined) {
      return true
    }
    const UK_POSTCODE_REGEX = /^(?!.*[GIJKLMNOQVWXZ])([A-PR-UWYZ][0-9][A-HJKPSTUW])\s*([0-9][ABD-HJLNP-UW-Z]{2})$/i
    const normalised = value.toString().replace(/\s/g, '')
    return validator.matches(normalised, new RegExp(UK_POSTCODE_REGEX))
  }

  defaultMessage (args: ValidationArguments) {
    return 'Enter a valid postcode'
  }
}

/**
 * Verify a valid UK postcode format (excluding Scotland and Northern Ireland).
 *
 */
export function IsValidPostcode (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPostcodeConstraint
    })
  }
}
