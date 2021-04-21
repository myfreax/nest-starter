import {
  applyDecorators,
  Controller as CommonController,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { TokenExpired } from '../../auth/dto/token-expired-dto';
import { ParamsValidateFailDto } from '../dto/params-validate-fail.dto';

export function Controller(controllerName: string) {
  return applyDecorators(
    ApiBearerAuth(),
    ApiTags(controllerName),
    ApiResponse({
      status: 401,
      description: 'Unauthorized OR token expired',
      content: {
        TokenExpired: {
          schema: {
            $ref: getSchemaPath(TokenExpired),
          },
        },
        UnauthorizedError: {},
      },
    }),
    ApiResponse({
      status: 400,
      description: 'params validate fail',
      type: () => ParamsValidateFailDto,
    }),
    CommonController(),
  );
}
