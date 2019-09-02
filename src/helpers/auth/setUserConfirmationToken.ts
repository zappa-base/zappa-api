import { getRepository } from 'typeorm';

import { ConfirmationToken } from '../../db/entities/ConfirmationToken';
import { User } from '../../db/entities/User';

import { generateUUIDToken } from './generateUUIDToken';

export async function setUserConfirmationToken(user: User) {
  const confirmationTokenRepository = getRepository(ConfirmationToken);

  const confirmationTokenRow = new ConfirmationToken();

  const [confirmToken, tokenHash] = await generateUUIDToken(true);

  confirmationTokenRow.token = tokenHash;
  confirmationTokenRow.user = user;

  confirmationTokenRepository.save(confirmationTokenRow);

  return confirmToken;
}
