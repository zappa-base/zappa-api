import { User } from '../../db/entities/User';
import { Connection } from 'typeorm';
import { ConfirmationToken } from '../../db/entities/ConfirmationToken';
import { generateUUIDToken } from './generateUUIDToken';

export async function setUserConfirmationToken(connection: Connection, user: User) {
  const confirmationTokenRepository = connection.getRepository(ConfirmationToken);

  const confirmationTokenRow = new ConfirmationToken();

  const [ confirmToken, tokenHash ] = await generateUUIDToken(true);

  confirmationTokenRow.token = tokenHash;
  confirmationTokenRow.user = user;

  confirmationTokenRepository.save(confirmationTokenRow);

  return confirmToken;
}