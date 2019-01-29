import {
  registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface
} from '@hmcts/class-validator'

@ValidatorConstraint()
export class MinTotalConstraint implements ValidatorConstraintInterface {

  validate (value: any, args: ValidationArguments): boolean {
    if (value === undefined) {
      return true
    }

    if (!Array.isArray(value)) {
      throw new Error('Expected validated element to be an array')
    }

    const minValue: number = this.extractMinValue(args)
    let total: number = 0
    for (let row of value) {
      if (typeof row.amount === 'number') {
        total += row.amount
      }
    }

    return total >= minValue
  }

  private extractMinValue (args: ValidationArguments): number {
    let minValue = args.constraints[0]
    if (typeof minValue === 'string') {
      minValue = (args.object as any)[minValue]
    }
    if (typeof minValue !== 'number') {
      throw new Error('Minimal required value parameter not given')
    }

    return minValue
  }
}

/**
 * Marks an array of objects with an amount parameter to be determined as valid if meeting a target amount
 * @param {any} minValue, the numeric value, or property name to a numeric value on annotated object that must be met
 * @param {ValidationOptions} validationOptions
 *
 * @example
 * class MinTotalTest {
 *  <at>MinTotal('targetValue')
 *  value?: any[] = [ { amount: 1 }, { amount: 2 } ]
 *  targetValue: number = 4
 * }
 * minimum: MinTotalTest = new MinTotalTest(25)
 * //Will return a validation error as the sum of amounts (3) is less than the target of 4 than 3
 * errors: ValidationError[] = validateSync(minimum)
 */
export function MinTotal (minValue: any, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'MinTotal',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [minValue],
      validator: MinTotalConstraint
    })
  }
}
