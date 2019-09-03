import { Album } from '../../../db/entities/Album';
import { getPaginatedResults } from '../../../helpers/pagination/getPaginatedResults';
import { IPaginationArgs } from '../../../types/IPagination';

interface IArgs {
  input: IPaginationArgs;
}

export async function albums(_: any, args: IArgs) {
  const { input = {} } = args;

  return getPaginatedResults<Album>(input, Album, 'title', 'ASC');
}
