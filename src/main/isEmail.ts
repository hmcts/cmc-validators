import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from '@hmcts/class-validator'
import * as punycode from 'punycode'

@ValidatorConstraint()
export class IsEmailConstraint implements ValidatorConstraintInterface {
  private static EMAIL_REGEX = new RegExp('^[a-z0-9.!#$%&\'*+/=?^_`{|}~\\-]+@([^.@][^@\\s]+)$', 'i')
  private static HOSTNAME_PART_REGEX = new RegExp('^(xn-|[a-z0-9]+)(-[a-z0-9]+)*$', 'i')
  private static TLD_REGEX = new RegExp('^([a-z]{2,63}|xn--([a-z0-9]+-)*[a-z0-9]+)$', 'i')

  public static isEmail (value: string): boolean {
    if (value.length > 320) {
      return false
    }
    if (value.includes('..')) {
      return false
    }
    let match = IsEmailConstraint.EMAIL_REGEX.exec(value)
    if (!match) {
      return false
    }
    let hostname = match[1]
    try {
      hostname = punycode.toASCII(hostname)
      punycode.toUnicode(hostname)
    } catch (err) {
      return false
    }
    if (hostname.length > 253) {
      return false
    }
    let parts: string[] = hostname.split('.')

    if (parts.length < 2) {
      return false
    }
    for (let part of parts) {
      if (part.length > 63) {
        return false
      }
      if (!IsEmailConstraint.HOSTNAME_PART_REGEX.exec(part)) {
        return false
      }
    }

    let tld = parts[parts.length - 1]
    return !!IsEmailConstraint.TLD_REGEX.exec(tld)
  }

  validate (value: any, args: ValidationArguments): boolean {
    return typeof value === 'string' && (value.length === 0 || IsEmailConstraint.isEmail(value))
  }
}

/**
 * Verify a valid email address.
 *
 * Validator validates only non empty string values, everything else is considered valid.
 */
export function IsEmail (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailConstraint
    })
  }
}
