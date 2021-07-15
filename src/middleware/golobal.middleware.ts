import { Injectable, NestMiddleware, Req, Session } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserSession } from 'src/modules/authen/dto/authen.dto';

declare module 'express-session' {
  interface Session {
    user: UserSession;
  }
}

@Injectable()
export class GolobalMiddleware implements NestMiddleware {
  use(@Req() req: Request, res: Response, next: NextFunction) {
    res.locals.user = req.session?.user;

    next();
  }
}
