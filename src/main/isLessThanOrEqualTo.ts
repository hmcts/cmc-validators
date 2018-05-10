import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint()
export class IsLessThanOrEqualToConstraint implements ValidatorConstraintInterface {
  validate (value: any, args: ValidationArguments) {
    if (value === undefined) {
      return true
    }

    const [relatedPropertyName] = args.constraints
    const relatedValue = (args.object as any)[relatedPropertyName]

    if (relatedValue === undefined || isNaN(relatedValue)) {
      return true
    }

    return typeof value === 'number' && typeof relatedValue === 'number' && value <= relatedValue
  }
}

/**
 * Marks a variable to be validated as less than or equal to a given property
 * @param {string} property the name of the property to be validated against
 * @param {ValidationOptions} validationOptions
 *
 * @example
 * class LessThanEqualTest {
 *  <at>IsLessThanOrEqualTo('targetValue')
 *  value?: any
 *  targetValue: number = 3
 *  constructor (value?: any) {
 *    this.value = value
 *  }
 * }
 * lessThan: LessThanEqualTest = new LessThanEqualTest(25)
 * //Will return a validation error as 25 is greater than 3
 * errors: ValidationError[] = validateSync(lessThan)
 */
export function IsLessThanOrEqualTo (property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLessThanOrEqualTo',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsLessThanOrEqualToConstraint
    })
  }
}
