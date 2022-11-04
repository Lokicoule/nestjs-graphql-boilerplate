import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export const ARRAY_CONTAINS = 'arrayContains';

@ValidatorConstraint({ name: ARRAY_CONTAINS })
export class ArrayContainsValidatorConstraint<T>
  implements ValidatorConstraintInterface
{
  validate(items: T[], validationArguments?: ValidationArguments): boolean {
    const [identifier] = validationArguments?.constraints;
    if (!items || !identifier) {
      return false;
    }

    return items?.some((item) => identifier(item));
  }

  defaultMessage() {
    return `The array must contain at least one item that matches the identifier`;
  }
}
