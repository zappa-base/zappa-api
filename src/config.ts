import { ConnectionOptions } from 'typeorm';

interface IConfig {
  auth: {
    tokenMaxAge: string;
    jwtSecret: string;
    saltRounds: number;
  };
  email: {
    mailgubApi: string,
  };
  db: ConnectionOptions;
  server: {
    env: 'development' | 'production'
    isDevelopment: boolean,
    isProduction: boolean,
    port: string | number,
  };
}

export const config: IConfig = {
  auth: {
    tokenMaxAge: '1 days',
    jwtSecret: process.env.JWT_SECRET,
    saltRounds: 10,
  },
  email: {
    mailgubApi: process.env.MAILGUN_API,
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
    env: (process.env.NODE_ENV as 'development' | 'production') || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    port: process.env.PORT,
  },
};