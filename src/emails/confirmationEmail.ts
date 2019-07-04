import { EmailEndpoints } from '../constants/EmailEndpoints';
import { EmailTemplates } from '../constants/EmailTemplates';
import { User } from '../db/entities/User';

import { sendTokenEmail } from './sendTokenEmail';

export async function sendConfirmationEmail(
  user: User,
  token: string,
  endpoint: EmailEndpoints,
) {
  return sendTokenEmail(user, token, EmailTemplates.CONFIRM, endpoint);
}
