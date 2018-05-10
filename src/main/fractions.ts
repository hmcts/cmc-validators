import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

import * as validator from 'validator'

@ValidatorConstraint()
export class FractionsConstraint implements ValidatorConstraintInterface {

  validate (value: any, args: ValidationArguments): boolean {
    const min = this.extractValue(args, args.constraints[0])
    const max = this.extractValue(args, args.constraints[1])

    if (min < 0) {
      throw new Error('Minimum allowed decimal places has to be specified and positive value')
    }

    if (max < 0) {
      throw new Error('Maximum allowed decimal places has to be specified and positive value')
    }

    if (value === undefined || typeof value !== 'number') {
      return true
    }

    const regex = '^[-]?\\d+\\.*\\d{' + min + ',' + max + '}\$'

    return validator.matches(value.toString(), new RegExp(regex))
  }

  private extractValue (validationArguments: ValidationArguments, value: any): number {
    let minValue = value
    if (typeof minValue === 'string') {
      minValue = (validationArguments.object as any)[minValue]
    }
    if (typeof minValue !== 'number') {
      throw new Error('Fraction value parameters must be specified')
    }

    return minValue
  }
}

/**
 * Verify a valid value with minimum and maxumim digits allowed after decimal point.
 */
export function Fractions (min: any, max: any, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [min, max],
      validator: FractionsConstraint
    })
  }
}
