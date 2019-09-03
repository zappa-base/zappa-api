import { IPaginationArgs, IPaginationInfo } from '../../types/IPagination';

export function createPaginationInfo(
  input: IPaginationArgs,
  total: number,
): IPaginationInfo {
  const { limit, page, sortBy, sortDirection } = input;

  return {
    limit,
    offset: limit * page,
    page,
    sortBy,
    sortDirection,
    total,
  };
}
