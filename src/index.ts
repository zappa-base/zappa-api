import 'dotenv/config';

// tslint:disable-next-line:ordered-imports next-line
import cors from 'cors';
import express from 'express';
import jwt from 'express-jwt';
import 'reflect-metadata';

import { config } from './config';
import { createDBConnection } from './db/createDBConnection';
import { createApollo } from './graphql/createApollo';

async function startServer() {
  const app = express();

  app.use(cors());

  app.use(
    jwt({
      credentialsRequired: false,
      secret: config.auth.jwtSecret,
    }),
  );

  app.use(function AuthErrorCheck(err: any, _req: any, _res: any, next: any) {
    if (err.name === 'UnauthorizedError') {
      next();
    }
  });

  try {
    await createDBConnection();
  } catch (error) {
    throw new Error(error);
  }

  const server = createApollo();

  server.applyMiddleware({ app });

  const PORT = config.server.port || 4000;

  app.listen(PORT, () => {
    console.info(`Listening on http://localhost:${PORT}/graphql 🚀`);
  });
}

startServer().catch((error) => console.error(error));
