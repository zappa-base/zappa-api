import { EmailEndpoints } from '../constants/EmailEndpoints';
import { EmailTemplates } from '../constants/EmailTemplates';
import { User } from '../db/entities/User';

import { getEmailLink } from './getEmailLink';
import { getMailer } from './getMailer';

export async function sendTokenEmail(
  user: User,
  token: string,
  template: EmailTemplates,
  endpoint: EmailEndpoints,
) {
  const email = getMailer();

  console.info('------------EMAIL-----------');
  console.info(`----${template} TOKEN------`);
  console.info(`${token}`);
  console.info('------------TOKEN-----------');
  console.info('-------------END--------------');

  try {
    await email.send({
      locals: {
        link: getEmailLink(token, template, endpoint),
        nickname: user.nickname,
        token,
      },
      message: {
        to: user.email,
      },
      template,
    });
  } catch (error) {
    console.error(error);
  }
}
