import { getRepository, FindConditions } from 'typeorm';

import { Session, SessionType } from '../../db/entities/Session';
import { User } from '../../db/entities/User';

export async function jwtSessionGenerator(user: User, pid?: string) {
  const sessionRepository = getRepository(Session);

  const where = {
    user,
  } as FindConditions<Session>;

  if (pid) {
    where.id = pid;
  }

  let session = await sessionRepository.findOne({
    where,
  });

  if (!session && typeof pid === 'undefined') {
    session = new Session();
    session.user = user;
    session.type = SessionType.JWT;
    session = await sessionRepository.save(session);
  } else if (!session) {
    return undefined;
  }

  return session;
}
