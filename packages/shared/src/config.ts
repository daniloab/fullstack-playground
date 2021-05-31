export const config = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/fullstack_playground',
  SERVER_PORT: process.env.SERVER_PORT || '5001',
  API_PORT: process.env.SERVER_PORT || '5002',
  JWT_KEY: process.env.JWT_KEY || 'secret_key',
};
