
import nodemailer from 'nodemailer';
import mailgun from 'nodemailer-mailgun-transport';
import Email from 'email-templates';
import path from 'path';
import { config } from '../config';

const client = nodemailer.createTransport(mailgun({
  auth: {
    api_key: config.email.mailgubApi,
    domain: 'sandbox05c17bc680f14ce4ace85cc669c2796e.mailgun.org',
  },
}));

export function getMailer() {
  const email = new Email({
    message: {
      from: 'text@example.com',
    },
    preview: false,
    send: true,
    transport: client,
    views: {
      root: path.join(`${__dirname}/templates`),
      options: {
        extension: 'ejs'
      }
    },
  });

  return email;
}
