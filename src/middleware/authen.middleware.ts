import { Injectable, NestMiddleware, Session } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserSession } from 'src/modules/authen/dto/authen.dto';

declare module 'express-session' {
  interface Session {
    user: UserSession;
  }
}

@Injectable()
export class AuthenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.session.user) {
      res.locals.errorMessage = 'need authen to access';
      res.redirect(`/`);
    }

    next();
  }
}
