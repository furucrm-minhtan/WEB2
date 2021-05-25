import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  SequelizeModuleAsyncOptions,
  SequelizeModuleOptions
} from '@nestjs/sequelize';
import { GroupedObservable } from 'rxjs';
import { Bookmark } from 'src/modules/bookmark/bookmark.model';
import { Category } from 'src/model/category.model';
import { Comment } from 'src/model/comment.model';
import { GroupTheater } from 'src/modules/groupTheater/groupTheater.model';
import { Movie } from 'src/modules/movie/movie.model';
import { Room } from 'src/modules/room/room.model';
import { Seat } from 'src/model/seat.model';
import { ShowTime } from 'src/modules/showTIme/showtime.model';
import { Theater } from 'src/modules/theater/theater.model';
import { Ticket } from 'src/modules/ticket/ticket.model';
import { User } from 'src/modules/user/user.model';
import { Op } from 'sequelize';
import { TheaterMovie } from 'src/modules/theaterMovie/theaterMovie.model';

export const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};

export default class SequelizeConfig {
  static getOrmConfig(
    configService: ConfigService,
    operatorsAliases: any
  ): SequelizeModuleOptions {
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
        Bookmark,
        TheaterMovie
      ],
      operatorsAliases
      // sync: {
      //   force: true
      // }
    };
  }
}

export const sequelizeConfigAsync: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService
  ): Promise<SequelizeModuleOptions> =>
    SequelizeConfig.getOrmConfig(configService, operatorsAliases),
  inject: [ConfigService]
};
