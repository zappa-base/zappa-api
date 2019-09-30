import { IPaginationArgs, IPaginationInfo } from '../../types/IPagination';

export function createPaginationInfo(
  input: IPaginationArgs,
  total: number,
): IPaginationInfo {
  const { limit, page, search, sortBy, sortDirection } = input;

  return {
    limit,
    offset: limit * page,
    page,
    search,
    sortBy,
    sortDirection,
    total,
  };
}
