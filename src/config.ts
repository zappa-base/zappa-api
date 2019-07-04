import { ConnectionOptions } from 'typeorm';

interface IConfig {
  auth: {
    tokenMaxAge: string;
    jwtSecret: string;
    saltRounds: number;
  };
  email: {
    mailgubApi: string;
  };
  db: ConnectionOptions;
  server: {
    env: 'development' | 'production';
    isDevelopment: boolean;
    isProduction: boolean;
    port: string;
  };
  urls: {
    admin: {
      confirmation: string;
      reset: string;
    };
  };
}

export const config: IConfig = {
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    saltRounds: 10,
    tokenMaxAge: '1 days',
  },
  db: {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    logging: process.env.DB_LOGGING === 'true',
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) ? Number(process.env.DB_PORT) : 5432,
    ssl: process.env.DB_SSL === 'true',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    type: 'postgres',
    username: process.env.DB_USER,
  },
  email: {
    mailgubApi: process.env.MAILGUN_API,
  },
  server: {
    env:
      (process.env.NODE_ENV as 'development' | 'production') || 'development',
    isDevelopment: isDevelopment(),
    isProduction: process.env.NODE_ENV === 'production',
    port: process.env.PORT,
  },
  urls: {
    admin: {
      confirmation: process.env.ADMIN_URL_CONFIRM,
      reset: process.env.ADMIN_URL_RESET,
    },
  },
};

function isDevelopment() {
  return (
    process.env.NODE_ENV === 'development' ||
    ['production', 'staging'].indexOf(process.env.NODE_ENV) === -1
  );
}
