import { HomeController } from './modules/controllers/home.controller';
import { MovieModule } from './modules/movie/movie.module';
import { MovieService } from './modules/movie/movie.service';
import { UserModule } from './modules/user/user.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { sequelizeConfigAsync } from './config/sequelize.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GolobalMiddleware } from './middleware/golobal.middleware';

@Module({
  imports: [
    MovieModule,
    UserModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync(sequelizeConfigAsync)
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GolobalMiddleware);
  }
}
