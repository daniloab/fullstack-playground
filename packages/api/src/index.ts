import '@babel/polyfill';
import 'isomorphic-fetch';

import app from './app';
import { config } from './config';
import { connectDatabase } from './database';

(async () => {
  try {
    await connectDatabase();
  } catch (error) {
    // eslint-disable-next-line
    console.error('Unable to connect to database');
    // Exit Process if there is no Database Connection
    process.exit(1);
  }
  await app.listen(config.PORT);
  // eslint-disable-next-line
  console.log(`API started on port ${config.PORT}`);
})();
