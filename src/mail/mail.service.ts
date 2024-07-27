import { Injectable } from '@nestjs/common';
import { SendGridClient } from './sendgrid-client';

@Injectable()
export class EmailService {
  constructor(private readonly sendGridClient: SendGridClient) {}

  async sendTestEmail(sms: any): Promise<void> {
    console.log('🚀 ~ EmailService ~ sendTestEmail ~ sms:', sms);
    const mail = {
      to: 'jayanta.garu23@gmail.com',
      from: 'jayanta.garu@gmail.com', //Approved sender ID in Sendgrid
      subject: 'Test email',
      content: [{ type: 'text/plain', value: 'sdkjcss' }],
    };
    await this.sendGridClient.send(mail);
  }

  async sendEmailWithTemplate(recipient: string, body: string): Promise<void> {
    const mail = {
      to: recipient,
      from: 'noreply@domain.com', //Approved sender ID in Sendgrid
      templateId: 'Sendgrid_template_ID', //Retrieve from config service or environment variable
      dynamicTemplateData: { body, subject: 'Send Email with template' }, //The data to be used in the template
    };
    await this.sendGridClient.send(mail);
  }
}
