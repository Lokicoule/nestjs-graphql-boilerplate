import { ArrayContains } from '@lib/fdo-validator';
import { applyDecorators } from '@nestjs/common';
import { ArrayUnique } from 'class-validator';
import { PropertyKeyEnum } from '../../domain/enums/property/property.enum';
import { PropertyInput } from '../dtos/property/property.input';

export function CodeGeneratorPropertiesValidator() {
  return applyDecorators(
    ArrayContains(
      (o: PropertyInput) =>
        o.key === PropertyKeyEnum.COUNTER && !isNaN(Number(o.value)),
      { message: 'Counter must be a number' },
    ),
    ArrayContains((o: PropertyInput) => o.key === PropertyKeyEnum.COUNTER, {
      message: 'Counter key is required',
    }),
    ArrayUnique((o) => o.key),
  );
}
