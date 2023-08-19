import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const statusCode = context.switchToHttp().getResponse().statusCode;

        if (statusCode >= 200 && statusCode < 300) {
          return {
            success: true,
            message: 'success',
            statusCode: statusCode,
            data: data,
          };
        } else {
          return {
            success: false,
            message: 'error',
            statusCode: statusCode,
            error: data,
          };
        }
      }),
    );
  }
}
