import { ShowTimeModule } from './modules/showTIme/showtime.module';
import { TheaterModule } from './modules/theater/theater.module';
import { GroupThearterModule } from './modules/groupTheater/groupthearter.module';
import { ActionResponseModule } from './modules/actionResponse/actionresponse.module';
import { RoomModule } from './modules/room/room.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { AuthenModule } from './modules/authen/authen.module';
import { HomeController } from './modules/controllers/home.controller';
import { MovieModule } from './modules/movie/movie.module';
import { MovieService } from './modules/movie/movie.service';
import { UserModule } from './modules/user/user.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { sequelizeConfigAsync } from './core/config/sequelize.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GolobalMiddleware } from './middleware/golobal.middleware';

@Module({
  imports: [
    ShowTimeModule,
    TheaterModule,
    GroupThearterModule,
    ActionResponseModule,
    RoomModule,
    BookmarkModule,
    TicketModule,
    AuthenModule,
    MovieModule,
    UserModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync(sequelizeConfigAsync)
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GolobalMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
