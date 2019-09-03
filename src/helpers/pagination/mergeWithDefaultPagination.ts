import { IPaginationArgs } from '../../types/IPagination';

import { defaultPaginationObject } from './defaultPaginationObject';

export function mergeWithDefaultPagination(
  input: IPaginationArgs,
  sortBy: string,
  sortDirection: 'ASC' | 'DESC' = 'ASC',
) {
  return {
    ...defaultPaginationObject(sortBy, sortDirection),
    ...input,
  };
}
