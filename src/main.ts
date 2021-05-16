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

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.use(urlencoded({ extended: true }));
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views/pages'));
  app.setViewEngine('hbs');
  app.set('layout', resolve('./src/views/layout'));
  app.set('view options', { layout: '../layout' });
  hbs.registerPartials(resolve('./src/views/components'));

  await app.listen(3000);
}
bootstrap();
