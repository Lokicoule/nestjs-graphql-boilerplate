import { registerAs } from '@nestjs/config';

const MONGO_DB_CONFIG_KEY = 'MONGO_DB_CONFIG_KEY';

export const MongoDBProviderConfiguration = registerAs(
  MONGO_DB_CONFIG_KEY,
  () => ({
    uri: process.env.CUSTOMERS_APPLICATION_DATABASE_URI,
  }),
);
