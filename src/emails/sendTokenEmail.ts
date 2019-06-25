import { User } from '../db/entities/User';

import { getMailer } from './getMailer';

export async function sendTokenEmail(
  user: User,
  token: string,
  template: 'reset' | 'confirmation',
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
        link: `http://localhost:3000/${
          template === 'reset' ? 'reset' : 'confirm'
        }/${token}`,
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
