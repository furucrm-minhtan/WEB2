import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as os from 'os';
import { ResetPassword } from './dto/mail.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserVerifyRegistration(
    user: Record<string, any>,
    token: string
  ): Promise<void> {
    const url = `${os.hostname}/auth/confirm?token=${token}`;

    await this.sendMail(
      [user.email],
      {
        subject: 'Welcome to Nice App! Confirm your Email',
        template: 'confirmation'
      },
      {
        name: user.name,
        url
      }
    );
  }

  async sendResetEmail({ email }: ResetPassword, token: string): Promise<void> {
    const url = `${os.hostname}/auth/reset-password?token=${token}`;

    await this.sendMail(
      [email],
      {
        subject: 'Welcome to Nice App! Confirm your Email',
        template: 'resetPassword'
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
