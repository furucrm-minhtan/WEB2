import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication
} from '@nestjs/platform-express';
import * as express from 'express';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { urlencoded } from 'body-parser';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import { ValidationPipe } from '@nestjs/common';
import * as hbs from 'express-hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );
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
  app.use(
    '/js/fontawesome',
    express.static(resolve('./node_modules/@fortawesome/fontawesome-free/js'))
  );
  app.use(
    '/css/fontawesome',
    express.static(resolve('./node_modules/@fortawesome/fontawesome-free/css'))
  );
  app.use(
    '/css/webfonts',
    express.static(
      resolve('./node_modules/@fortawesome/fontawesome-free/webfonts')
    )
  );
  app.use(
    '/js/mdbootstrap',
    express.static(resolve('./node_modules/mdbootstrap/js'))
  );
  app.use(
    '/css/mdbootstrap',
    express.static(resolve('./node_modules/mdbootstrap/css'))
  );
  app.engine(
    'hbs',
    hbs.express4({
      partialsDir: resolve('./src/views/components'),
      defaultLayout: resolve('./src/views/layout'),
      layoutsDir: resolve('./src/views')
    })
  );
  app.setBaseViewsDir(resolve('./src/views/pages'));
  app.setViewEngine('hbs');

  hbs.registerHelper('formatDate', function (datetime: string, format: string) {
    return moment(datetime).format(format);
  });

  await app.listen(3000);
}
bootstrap();
