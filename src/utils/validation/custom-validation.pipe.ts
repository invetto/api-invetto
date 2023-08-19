import { Injectable, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.map((error) => ({
          message: error.constraints[Object.keys(error.constraints)[0]],
          type: error.constraints[Object.keys(error.constraints)[0]],
          path: error.property,
        }));

        return {
          errors: formattedErrors,
        };
      },
    });
  }
}
