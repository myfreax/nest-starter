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
  constructor(message: string = '') {
    this.message = message;
  }
  intercept(context: ExecutionContext, stream$: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    if (context.getType() === 'http' && request.method == 'get') {
      return stream$.handle().pipe(
        tap((data) => {
          if (data === undefined || (data == null && this.message)) {
            throw new NotFoundException(this.message);
          } else {
            throw new NotFoundException();
          }
        }),
      );
    } else {
      return stream$.handle();
    }
  }
}
