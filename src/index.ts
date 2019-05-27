require('dotenv').config()
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { schema } from './graphql';
import { config } from './config';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

const server = new ApolloServer({
  introspection : true,
  playground: true,
  ...schema,
});

server.applyMiddleware({ app });

const PORT = config.server.port || 4000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/graphql 🚀`);
});
