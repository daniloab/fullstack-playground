import '@babel/polyfill';
import { createServer } from 'http';

import { connectDatabase, config } from '@fullstack-playground/shared';

import app from './app';

const runServer = async () => {
  try {
    console.log('connecting to database...');
    await connectDatabase();
  } catch (error) {
    // eslint-disable-next-line
    console.log('Could not connect to database', { error });
    throw error;
  }

  const server = createServer(app.callback());

  server.listen(config.SERVER_PORT, () => {
    // eslint-disable-next-line
    console.log(`Server started on port :${config.SERVER_PORT}`);
    // eslint-disable-next-line
    console.log(`GraphQL Fullstack Playground available at /playground on port ${config.SERVER_PORT}`);
  });
};

(async () => {
  // eslint-disable-next-line
  console.log('server starting...');

  await runServer();
})();
