import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PropertyDto } from '../../../dtos/property/property.dto';
import { PropertyKeyEnum } from 'apps/fdo-customer/src/domain/enums/property/property.enum';

@Injectable()
@ValidatorConstraint({ name: 'isDigitValidatorConstraint' })
export class IsDigitValidatorConstraint
  implements ValidatorConstraintInterface
{
  validate(properties: PropertyDto[]): boolean {
    return properties.every(
      (property) =>
        property.key.toUpperCase() === PropertyKeyEnum.COUNTER &&
        /^\d+$/.test(property.value),
    );
  }

  defaultMessage() {
    return 'Counter must be a digit';
  }
}
