import { User } from '../db/entities/User';

import { sendTokenEmail } from './sendTokenEmail';

export async function sendConfirmationEmail(user: User, token: string) {
  return sendTokenEmail(user, token, 'confirmation');
}