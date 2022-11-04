import { registerDecorator, ValidationOptions } from 'class-validator';
import {
  ArrayContainsValidatorConstraint,
  ARRAY_CONTAINS,
} from './array-contains.validator';

export function ArrayContains<T>(
  identifier: (o: T) => boolean,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: ARRAY_CONTAINS,
      target: object.constructor,
      propertyName: propertyName,
      constraints: [identifier],
      options: validationOptions,
      validator: ArrayContainsValidatorConstraint,
    });
  };
}
