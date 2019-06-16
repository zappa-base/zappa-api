require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import jwt from 'express-jwt';
import 'reflect-metadata';

import { config } from './config';
import { createDBConnection } from './db/createDBConnection';
import { schema } from './graphql';

async function startServer() {
  const app = express();

  app.use(
    jwt({
      credentialsRequired: false,
      secret: config.auth.jwtSecret,
     })
  );

  app.use(function (err: any, req: any, res: any, next: any) {
    if (err.name === 'UnauthorizedError') {
      next();
    }
  });

  await createDBConnection();

  const server = new ApolloServer({
    context: ({ req }: any) => ({
      user: req.user,
    }),
    introspection : true,
    playground: true,
    ...schema,
  });

  server.applyMiddleware({ app });

  const PORT = config.server.port || 4000;

  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/graphql 🚀`);
  });
}

startServer();
