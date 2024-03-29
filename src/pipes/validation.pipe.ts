import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length > 0) {
      const messages = errors.map((err) => Object.values(err.constraints));
      const response = Object.assign(
        {},
        ...messages.map((message, id) => ({ [id]: message })),
      );
      throw new ValidationException(response);
    }

    return value;
  }
}
