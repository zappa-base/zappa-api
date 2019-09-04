import { makeExecutableSchema } from 'graphql-tools';

import { AuthDirective } from './directives/AuthDirective';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export const schema = makeExecutableSchema({
  resolvers,
  schemaDirectives: {
    auth: AuthDirective,
  },
  typeDefs,
});
