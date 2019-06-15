import { getConnection } from 'typeorm';
import { User } from '../../db/entities/User';

export const Query =  {
  users: async () => {
    return getConnection().getRepository(User).find();
  }
};