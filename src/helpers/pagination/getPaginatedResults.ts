import { getRepository, FindManyOptions } from 'typeorm';

import { ILike } from '../../db/helpers/customOperators/ILike';
import { IPaginationArgs, IPaginationResult } from '../../types/IPagination';

import { createPaginationInfo } from './createPaginationInfo';
import { mergeWithDefaultPagination } from './mergeWithDefaultPagination';

export async function getPaginatedResults<T>(
  input: IPaginationArgs,
  model: new () => T,
  sortByDefault: string,
  sortDirectionDefault: 'ASC' | 'DESC',
  searchColumns: string[] = [],
): Promise<IPaginationResult<T>> {
  const paginationArgs = mergeWithDefaultPagination(
    input,
    sortByDefault,
    sortDirectionDefault,
  );

  const { limit, page, search, sortBy, sortDirection } = paginationArgs;

  const findOption: FindManyOptions<unknown> = {
    order: {
      [sortBy]: sortDirection,
    },
    skip: limit * (page - 1),
    take: limit,
  };

  if (search && searchColumns && searchColumns.length) {
    findOption.where = searchColumns.map((searchColumn) => ({
      [searchColumn]: ILike(`%${search}%`),
    }));
  }

  const [results, total] = await getRepository(model as any).findAndCount(
    findOption,
  );

  return {
    pagination: createPaginationInfo(paginationArgs, total),
    results: results as T[],
  };
}
