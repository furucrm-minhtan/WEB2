import { Injectable, NestMiddleware, Req, Session } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserSession } from 'src/modules/authen/dto/authen.dto';
import { CategoryService } from 'src/modules/category/category.service';

declare module 'express-session' {
  interface Session {
    user: UserSession;
  }
}

@Injectable()
export class GolobalMiddleware implements NestMiddleware {
  constructor(private readonly cateService: CategoryService) {}

  async use(@Req() req: Request, res: Response, next: NextFunction) {
    res.locals.user = req.session?.user;
    res.locals.categories = await this.cateService.fetchCategory({
      order: [['level', 'DESC']],
      limit: 5,
      raw: true
    });
    next();
  }
}
