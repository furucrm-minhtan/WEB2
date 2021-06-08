import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Vonage from '@vonage/server-sdk';

@Injectable()
export class SmsService {
  private vonage;

  constructor(configService: ConfigService) {
    this.vonage = new Vonage({
      apiKey: configService.get('SMS_APIKEY') || 'a02f0851',
      apiSecret: configService.get('SMS_SECRETKEY') || 'yDfj8JCtn1cbQfaG'
    });
  }

  send({ from, to, text }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.vonage.message.sendSms(
        from,
        to,
        text,
        (err: string, responseData: Record<string, any>) => {
          if (err) {
            reject(err);
          } else {
            resolve(responseData);
          }
        }
      );
    });
  }
}
