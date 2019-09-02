import { CustomScalars } from '../CustomScalars';

import { Mutation } from './Mutation';
import { Query } from './Query';

export const resolvers = {
  Mutation,
  Query,
  ...CustomScalars,
};
