import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  NotFoundException,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  private message: string;
  constructor(message = 'Not Found') {
    this.message = message;
  }
  intercept(context: ExecutionContext, stream$: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    if (context.getType() === 'http' && request.method == 'GET') {
      return stream$.handle().pipe(
        tap((data) => {
          if (data === undefined || data == null) {
            throw new NotFoundException(this.message);
          }
        }),
      );
    } else {
      return stream$.handle();
    }
  }
}
