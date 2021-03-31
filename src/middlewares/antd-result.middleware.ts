import { Body, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class AntdResultMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const send = res.send;
    res.send = function (string) {
      let body = string instanceof Buffer ? string.toString() : string;
      send.call(this, body);
      return body;
    };
    next();
  }
}
