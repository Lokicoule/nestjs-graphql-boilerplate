import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';
import { IsPhoneNumber } from 'class-validator';

@ValidatorConstraint({ name: 'isOptionalPhoneNumber' })
export class IsOptionalPhoneNumberConstraint {
  validate(value: any, args: ValidationArguments) {
    if (!value) return true;

    const [isValid] = Reflect.getMetadata(
      '__validationMetadatas__',
      IsPhoneNumber,
    ).filter((metadata) => metadata.propertyName === args.property);

    return isValid.validate(value, args);
  }
}

export function IsOptionalPhoneNumber(
  regionCode: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [regionCode],
      validator: IsOptionalPhoneNumberConstraint,
    });
  };
}
