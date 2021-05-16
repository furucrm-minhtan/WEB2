import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  SequelizeModuleAsyncOptions,
  SequelizeModuleOptions
} from '@nestjs/sequelize';
import { GroupedObservable } from 'rxjs';
import { Bookmarks } from 'src/model/bookmark.model';
import { Category } from 'src/model/category.model';
import { Comment } from 'src/model/comment.model';
import { GroupTheater } from 'src/model/groupTheater.model';
import { Movie } from 'src/model/movie.model';
import { Room } from 'src/model/room.model';
import { Seat } from 'src/model/seat.model';
import { ShowTime } from 'src/model/showTime.model';
import { Theater } from 'src/model/theater.model';
import { Ticket } from 'src/model/ticket.model';
import { User } from 'src/model/user.model';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): SequelizeModuleOptions {
    return {
      dialect: configService.get('DB_DRIVER') || 'mysql',
      host: configService.get('DB_HOST') || 'localhost',
      port: configService.get('DB_PORT') || 3306,
      username: configService.get('DB_USERNAME') || 'root',
      password: configService.get('DB_PASS'),
      database: configService.get('DB_NAME') || 'local',
      autoLoadModels: true,
      synchronize: true,
      models: [
        User,
        Ticket,
        Theater,
        ShowTime,
        Seat,
        Room,
        Movie,
        GroupTheater,
        Comment,
        Category,
        Bookmarks
      ]
    };
  }
}

export const typeOrmConfigAsync: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService
  ): Promise<SequelizeModuleOptions> =>
    TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService]
};
