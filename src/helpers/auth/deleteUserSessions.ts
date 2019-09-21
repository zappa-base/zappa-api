import { getRepository } from 'typeorm';

import { Session } from '../../db/entities/Session';

export async function deleteUserSessions(userId: string) {
  const sessionRepository = getRepository(Session);

  return sessionRepository.delete({
    user: { id: userId },
  });
}
