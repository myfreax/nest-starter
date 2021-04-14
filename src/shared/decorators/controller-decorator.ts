import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { TokenExpiredError } from '../../auth/dto/tokenExpiredError-dto';
import { ParamsValidateFailDto } from '../dto/paramsValidateFail-dto';

export function ControllerDecorator(controllerName: string) {
  return applyDecorators(
    ApiBearerAuth(),
    ApiTags(controllerName),
    ApiResponse({
      status: 401,
      description: 'Unauthorized OR token expired',
      content: {
        TokenExpiredError: {
          schema: {
            $ref: getSchemaPath(TokenExpiredError),
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
  );
}
