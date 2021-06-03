import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from '@hmcts/class-validator'
import { ErrorLogger } from 'logging/errorLogger'
import { AddressInfoResponse } from '@hmcts/os-places-client'
import { ClientFactory } from 'postcode-lookup/clientFactory'

const postcodeClient = ClientFactory.createOSPlacesClient()

@ValidatorConstraint({ async: true })
export class CheckPostCodeConstraint implements ValidatorConstraintInterface {

  async validate (value: any | string, args?: ValidationArguments): Promise<boolean> {

    try {
      const addressInfoResponse: AddressInfoResponse = await postcodeClient.lookupByPostcode(value)
      if (!addressInfoResponse.isValid) {
        return false
      }
      return true
    } catch (err) {
      const errorLogger = new ErrorLogger()
      errorLogger.log(err)
      return true
    }
  }

  defaultMessage (args: ValidationArguments) {
    return 'We cannot find an address for that postcode.'
  }
}

/**
 * Verify postcode is within accepted list of countries.
 */
export function IsPostcodeAvailable (value : Object, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckPostCodeConstraint
    })
  }
}
