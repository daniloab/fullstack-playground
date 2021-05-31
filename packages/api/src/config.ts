import { config as configShared } from '@fp/shared';

export const config = {
  MONGO_URI: process.env.MONGO_URI || configShared.MONGO_URI || 'mongodb://localhost/fullstack_playground',
  API_PORT: process.env.API_PORT || configShared.API_PORT || '5002',
  JWT_KEY: process.env.JWT_KEY || configShared.JWT_KEY || 'secret_key',
};
