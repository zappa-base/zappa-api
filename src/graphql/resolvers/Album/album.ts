import { getRepository } from 'typeorm';

import { Album } from '../../../db/entities/Album';

interface IArgs {
  id: string;
}

export async function album(_: any, args: IArgs) {
  return getRepository(Album).findOne(args.id);
}
