import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log('미들웨어...');
//     next();
//   }
// }

// 미들웨어에 종속성이 필요하지 않다면 굳이 class로 할 필요가 없다.
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('미들웨어...');
  next();
}
