import { MailModule } from './modules/mail/mail.module';
import { ReviewModule } from './modules/review/review.module';
import { SeatModule } from './modules/seat/seat.module';
import { ShowTimeModule } from './modules/showTime/showtime.module';
import { TheaterModule } from './modules/theater/theater.module';
import { GroupThearterModule } from './modules/groupTheater/groupthearter.module';
import { ActionResponseModule } from './modules/actionResponse/actionresponse.module';
import { RoomModule } from './modules/room/room.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { AuthenModule } from './modules/authen/authen.module';
import { MovieModule } from './modules/movie/movie.module';
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
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfigOptionsAsync } from './core/config/mailer.config';
import { MailService } from './modules/mail/mail.service';
import { AuthenMiddleware } from './middleware/authen.middleware';
import { UserController } from './modules/user/user.controller';

@Module({
  imports: [
    MailModule,
    ReviewModule,
    SeatModule,
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
    MailerModule.forRootAsync(mailerConfigOptionsAsync),
    SequelizeModule.forRootAsync(sequelizeConfigAsync)
  ],
  providers: [MailService],
  exports: [MailService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GolobalMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(AuthenMiddleware)
      .exclude(
        { path: 'forgot-password', method: RequestMethod.ALL },
        { path: 'registration', method: RequestMethod.ALL },
        { path: 'reset-password', method: RequestMethod.ALL }
      )
      .forRoutes(UserController);
  }
}
