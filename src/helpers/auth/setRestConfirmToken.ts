import { Connection } from 'typeorm';

import { ResetToken } from '../../db/entities/ResetToken';
import { User } from '../../db/entities/User';

import { generateUUIDToken } from './generateUUIDToken';

export async function setUserResetToken(connection: Connection, user: User) {
  const resetTokenRepository = connection.getRepository(ResetToken);

  const resetTokenRow = new ResetToken();

  const [ resetToken, tokenHash ] = await generateUUIDToken(true);

  resetTokenRow.token = tokenHash;
  resetTokenRow.user = user;

  resetTokenRepository.save(resetTokenRow);

  return resetToken;
}