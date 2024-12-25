import nodemailer from 'nodemailer';
import { env } from '@/lib/env';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: env.SMTP_HOST,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: env.SMTP_USERNAME,
    pass: env.SMTP_PASSWORD,
  },
  from: '"Autolab" <no-reply@autolab952@gmail.com>',
});

export default transporter;
