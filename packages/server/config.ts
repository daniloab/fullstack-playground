import { config as configShared } from '@fp/shared';

export const config = {
  MONGO_URI: process.env.MONGO_URI || configShared.MONGO_URI || 'mongodb://localhost/fullstack_playground',
  SERVER_PORT: process.env.SERVER_PORT || configShared.SERVER_PORT || '5001',
  JWT_KEY: process.env.JWT_KEY || configShared.JWT_KEY || 'secret_key',
};
