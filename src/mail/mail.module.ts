import { Module } from '@nestjs/common';
import { SendGridClient } from './sendgrid-client';
import { EmailService } from './mail.service';

@Module({
  providers: [EmailService, SendGridClient],
  exports: [EmailService],
})
export class EmailModule {}
