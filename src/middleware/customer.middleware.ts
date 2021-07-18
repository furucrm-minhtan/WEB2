import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.session.user.is_admin) {
      res.locals.errorMessage = 'you not have permision to access';
      res.redirect(`/`);
    }

    next();
  }
}
