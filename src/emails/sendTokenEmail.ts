import { User } from '../db/entities/User';
import { getMailer } from './getMailer';

export async function sendTokenEmail(user: User, token: string, template: 'reset' | 'confirmation') {
  const email = getMailer();

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