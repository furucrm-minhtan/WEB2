import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Vonage from '@vonage/server-sdk';

@Injectable()
export class SmsService {
  private vonage;

  constructor(private readonly configService: ConfigService) {
    this.vonage = new Vonage({
      apiKey: configService.get('SMS_APIKEY') || 'a02f0851',
      apiSecret: configService.get('SMS_SECRETKEY') || 'yDfj8JCtn1cbQfaG'
    });
  }

  send({ to, text }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.vonage.message.sendSms(
        this.configService.get('SMS_FROM'),
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
