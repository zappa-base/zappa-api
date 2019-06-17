import { User } from '../db/entities/User';

import { getMailer } from './getMailer';

export async function sendTokenEmail(user: User, token: string, template: 'reset' | 'confirmation') {
  const email = getMailer();

  console.log('------------EMAIL-----------');
  console.log(`----${template} TOKEN------`);
  console.log(`${token}`);
  console.log('------------TOKEN-----------');
  console.log('-------------END--------------');

  try {
    await email.send({
      template,
      locals: {
        nickname: user.nickname,
        token,
        link: `http://localhost:3000/${template === 'reset' ? 'reset' : 'confirm'}/${token}`
      },
      message: {
        to: user.email,
      },
    });
  } catch (error) {
    console.error(error);
  }
}