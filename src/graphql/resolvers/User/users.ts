import { User } from '../../../db/entities/User';
import { getPaginatedResults } from '../../../helpers/pagination/getPaginatedResults';
import { IPaginationArgs } from '../../../types/IPagination';

interface IArgs {
  input: IPaginationArgs;
}

export async function users(_: any, args: IArgs) {
  const { input = {} } = args;

  return getPaginatedResults<User>(input, User, 'email', 'ASC', [
    'nickname',
    'email',
  ]);
}
