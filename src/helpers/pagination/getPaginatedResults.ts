import { getRepository } from 'typeorm';

import { IPaginationArgs, IPaginationResult } from '../../types/IPagination';

import { createPaginationInfo } from './createPaginationInfo';
import { mergeWithDefaultPagination } from './mergeWithDefaultPagination';

export async function getPaginatedResults<T>(
  input: IPaginationArgs,
  model: new () => T,
  sortByDefault: string,
  sortDirectionDefault: 'ASC' | 'DESC',
): Promise<IPaginationResult<T>> {
  const paginationArgs = mergeWithDefaultPagination(
    input,
    sortByDefault,
    sortDirectionDefault,
  );

  const { limit, page, sortBy, sortDirection } = paginationArgs;

  const [results, total] = await getRepository(model as any).findAndCount({
    order: {
      [sortBy]: sortDirection,
    },
    skip: limit * (page - 1),
    take: limit,
  });

  return {
    pagination: createPaginationInfo(paginationArgs, total),
    results: results as T[],
  };
}
