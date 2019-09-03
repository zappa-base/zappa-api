import { IPaginationArgs } from '../../types/IPagination';

export function defaultPaginationObject(
  sortBy?: string,
  sortDirection: 'ASC' | 'DESC' = 'ASC',
): IPaginationArgs {
  return {
    limit: 10,
    page: 1,
    sortBy,
    sortDirection,
  };
}
