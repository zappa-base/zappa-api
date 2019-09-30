import faker, { date, internet } from 'faker';
import { Connection } from 'typeorm';

import { hashToken } from '../../helpers/auth/hashToken';
import { User, UserRole, UserStatus } from '../entities/User';

faker.seed(908235798534);

export default async function createAlbums(connection: Connection) {
  const users = Array(20)
    .fill('')
    .map(() => ({
      confirmedAt: date.recent(10),
      email: internet.email(),
      nickname: internet.userName(),
      password: hashToken(internet.password(6)),
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
    }));

  const userRepository = connection.getRepository(User);

  const results = await userRepository.insert(users);

  console.info('Records Created: ', results.raw.length);

  return connection;
}
