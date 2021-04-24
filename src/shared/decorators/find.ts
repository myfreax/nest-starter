import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiResponseMetadata } from '@nestjs/swagger';
import { NotFoundDto } from '../dto/not-found.dto';
import { NotFoundInterceptor } from '../interceptors/not-found.interceptor';
export function Find(options: Omit<ApiResponseMetadata, 'status'>) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      type: options.type,
      isArray: options.isArray,
      description: options.description,
      headers: options.headers,
    }),
    ApiResponse({
      status: 404,
      type: () => NotFoundDto,
      headers: options.headers,
      description: options.description,
    }),
    UseInterceptors(new NotFoundInterceptor()),
  );
}
