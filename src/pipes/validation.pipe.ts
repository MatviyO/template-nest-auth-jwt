import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { VallidationExeption } from '@/exeptions/vallidation.exeption';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      let message = errors.map(error => {
        return `${error.property}: ${Object.values(error.constraints).join(', ')}`
      })
      throw new VallidationExeption(message)
    }

    return value;
  }

}
