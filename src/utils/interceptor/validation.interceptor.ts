import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ValidationError } from 'class-validator';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof BadGatewayException) {
          return throwError(error);
        }

        if (Array.isArray(error.message) && error.message[0] instanceof ValidationError) {
          const formattedErrors = error.message.reduce((acc, validationError) => {
            const constraints = validationError.constraints;
            for (const key in constraints) {
              acc[key] = {
                message: constraints[key],
                type: validationError.property,
                path: key,
              };
            }
            return acc;
          }, {});

          return throwError({
            errors: formattedErrors,
          });
        }

        return throwError(error);
      })
    );
  }
}
