import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from '@hmcts/class-validator'

@ValidatorConstraint()
export class IsNotBlankConstraint implements ValidatorConstraintInterface {

  validate (value?: any, args?: ValidationArguments): boolean {
    if (value === undefined || args === undefined) {
      return true
    }

    if (typeof value !== 'string') {
      return false
    }

    return value.trim().length > 0
  }

}

/**
 * Verify string is not empty or blank.
 */
export function IsNotBlank (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotBlankConstraint
    })
  }
}
