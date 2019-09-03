export interface IPaginationInfo {
  limit?: number;
  offset?: number;
  page?: number;

  sortBy?: string;
  sortDirection?: string;

  total: number;
}

export interface IPaginationResult<T> {
  pagination: IPaginationInfo;
  results: T[];
}

export interface IPaginationArgs {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}
