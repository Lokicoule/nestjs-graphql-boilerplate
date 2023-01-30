import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
} from 'class-validator';
import { IsEmail } from 'class-validator';

@ValidatorConstraint({ name: 'isOptionalEmail' })
export class IsOptionalEmailConstraint {
  validate(value: any, args: ValidationArguments) {
    if (!value) return true;

    const [isValid] = Reflect.getMetadata(
      '__validationMetadatas__',
      IsEmail,
    ).filter((metadata) => metadata.propertyName === args.property);

    return isValid.validate(value, args);
  }
}

export function IsOptionalEmail(validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'isOptionalEmail',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsOptionalEmailConstraint,
    });
  };
}
