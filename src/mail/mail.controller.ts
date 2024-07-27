import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly emailService: EmailService) {}
  @Post('send-test-email')
  async sendEmail(@Body() sendEmailDTO: any): Promise<void> {
    await this.emailService.sendTestEmail(sendEmailDTO);
  }
}
