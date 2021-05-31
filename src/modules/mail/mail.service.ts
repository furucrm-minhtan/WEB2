import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as os from 'os';
import { ResetPassword } from './dto/mail.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserVerifyRegistration(
    url: string,
    user: Record<string, any>
  ): Promise<void> {
    await this.sendMail(
      [user.email],
      {
        subject: 'Welcome to Nice App! Confirm your Email',
        template: './confirmation'
      },
      {
        name: user.name,
        url
      }
    );
  }

  async sendResetEmail(url: string, { email }: ResetPassword): Promise<void> {
    await this.sendMail(
      [email],
      {
        subject: 'Reset your Password',
        template: './resetPassword'
      },
      {
        url
      }
    );
  }

  private sendMail(
    receiptions: string[],
    { subject, template }: { subject: string; template: string },
    context: Record<string, any>
  ) {
    return this.mailerService.sendMail({
      to: receiptions.join(','),
      subject,
      template,
      context
    });
  }
}
