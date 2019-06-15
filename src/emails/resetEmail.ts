import { User } from '../db/entities/User';
import { sendTokenEmail } from './sendTokenEmail';

export async function sendResetEmail(user: User, token: string) {
  return sendTokenEmail(user, token, 'reset');
}