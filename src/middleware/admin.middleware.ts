import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserSession } from 'src/modules/authen/dto/authen.dto';

declare module 'express-session' {
  interface Session {
    user: UserSession;
  }
}

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.session.user || req.session.user.is_admin) {
      res.locals.errorMessage = 'need authen or admin to access';
      res.redirect(`/`);
    }
    next();
  }
}
