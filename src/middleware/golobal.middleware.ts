import { Injectable, NestMiddleware, Session } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class GolobalMiddleware implements NestMiddleware {
  use(
    @Session() session: Record<string, any>,
    res: Response,
    next: NextFunction
  ) {
    next();
  }
}