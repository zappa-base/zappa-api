import { ConnectionOptions } from 'typeorm';

interface IConfig {
  auth: {
    tokenMaxAge: string;
    jwtSecret: string;
    saltRounds: number;
  };
  db: ConnectionOptions;
  server: any;
}

export const config: IConfig = {
  auth: {
    tokenMaxAge: '1 days',
    jwtSecret: process.env.JWT_SECRET,
    saltRounds: 10,
  },
  db: {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    logging: process.env.DB_LOGGING === 'true',
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) ? Number(process.env.DB_PORT) : 5432,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    type: 'postgres',
    username: process.env.DB_USER,
  },
  server: {
    port: process.env.PORT,
  },
};