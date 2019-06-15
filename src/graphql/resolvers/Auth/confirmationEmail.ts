import { User } from '../../../db/entities/User';
import { getMailer } from '../../../emails/getMailer';

export async function sendConfirmationEmail(user: User, token: string) {
  const email = getMailer();

  try {
    await email.send({
      template: 'confirmation',
      locals: {
        nickname: user.nickname,
        link: `http://localhost:3000/confirm/${token}`
      },
      message: {
        to: user.email,
      },
    });
  } catch (error) {
    console.error(error);
  }
}