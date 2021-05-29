import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

export default class MailerConfig {
  static getMailerConfig(configService: ConfigService): MailerOptions {
    return {
      transport: {
        service: 'gmail',
        host: configService.get('MAIL_HOST'),
        port: configService.get('MAIL_PORT'),
        secure: configService.get('MAIL_SECURE'),
        auth: {
          user: configService.get('MAIL_USER'),
          pass: configService.get('MAIL_PASSWORD')
        }
      },
      defaults: {
        from: configService.get('MAIL_FROM')
      },
      template: {
        dir: join(__dirname, 'mail', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    };
  }
}

export const mailerConfigOptionsAsync: MailerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (ConfigService: ConfigService): Promise<MailerOptions> =>
    MailerConfig.getMailerConfig(ConfigService)
};
