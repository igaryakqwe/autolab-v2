import RequestError from '@/server/common/request-error';
import {
  ErrorCodes,
  ErrorMessages,
} from '@/server/common/enums/error-codes.enum';
import { emailTemplate } from './email-template';
import transporter from '@/lib/nodemailer';
import { Routes } from '@/constants/routes';

class EmailService {
  async sendApprovalEmail(
    url: string,
    email: string,
    token: string,
  ): Promise<void> {
    try {
      const approvalLink = `${url}/${Routes.Approve}?token=${token}&email=${email}`;
      const htmlContent = emailTemplate.replace(
        '{{approvalLink}}',
        approvalLink,
      );

      await transporter.sendMail({
        from: '"Autolab" <noreply@autolab.com>',
        to: email,
        subject: 'Підтвердження пошти | Autolab',
        html: htmlContent,
        text: `Підтвердіть свою пошту за посиланням: ${approvalLink}`,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new RequestError({
        code: ErrorCodes.EMAIL_SENDING_ERROR,
        message: ErrorMessages.EMAIL_SENDING_ERROR,
      });
    }
  }
}

export const emailService = new EmailService();
