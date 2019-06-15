import { User } from '../../db/entities/User';
import { Connection } from 'typeorm';
import { generateUUIDToken } from './generateUUIDToken';
import { ResetToken } from '../../db/entities/ResetToken';

export async function setUserResetToken(connection: Connection, user: User) {
  const resetTokenRepository = connection.getRepository(ResetToken);

  const resetTokenRow = new ResetToken();

  const [ resetToken, tokenHash ] = await generateUUIDToken(true);

  resetTokenRow.token = tokenHash;
  resetTokenRow.user = user;

  resetTokenRepository.save(resetTokenRow);

  return resetToken;
}