import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication
} from '@nestjs/platform-express';
import * as express from 'express';
import { AppModule } from './app.module';
import { resolve } from 'path';
import * as hbs from 'hbs';
import { urlencoded } from 'body-parser';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.use(urlencoded({ extended: true }));
  app.use(
    session({
      secret: configService.get('SECRET_KEY'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 0.5 * 60 * 60 * 1000
      }
    })
  );
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views/pages'));
  app.setViewEngine('hbs');
  app.set('layout', resolve('./src/views/layout'));
  app.set('view options', { layout: '../layout' });
  hbs.registerPartials(resolve('./src/views/components'));

  hbs.registerHelper('section', function (name: string, options: any) {
    if (!this.sections) this.sections = {};
    this.sections[name] = options.fn(this);
    return null;
  });

  await app.listen(3000);
}
bootstrap();
