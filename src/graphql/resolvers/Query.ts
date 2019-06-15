import { getConnection } from 'typeorm';

import { User } from '../../db/entities/User';
import { currentUser } from './Auth/currentUser';

export const Query =  {
  currentUser,
  users: async () => {
    return getConnection().getRepository(User).find();
  }
};