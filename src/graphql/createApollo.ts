import { ApolloServer } from 'apollo-server-express';

import { schema } from './schema';

export function createApollo() {
  return new ApolloServer({
    context: ({ req }: any) => ({
      user: req.user,
    }),
    introspection: true,
    playground: true,
    schema,
    tracing: true,
  });
}
