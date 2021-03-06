import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from '@hmcts/class-validator'

import * as validator from 'validator'

@ValidatorConstraint()
export class IsFeeAccountConstraint implements ValidatorConstraintInterface {

  validate (value: any, args: ValidationArguments): boolean {
    if (value == null) {
      return true
    }

    if (typeof value !== 'string') {
      return false
    }

    return validator.matches(value.trim(), new RegExp(/^PBA[0-9]{7}$/gi))
  }

}

/**
 * Verify a valid fee account number based on the rules:
 * A Fee Account reference must be in the format PBAnnnnnnn (where n is a number from 0 to 9)
 */
export function IsFeeAccount (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFeeAccountConstraint
    })
  }
}
