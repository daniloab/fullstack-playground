// eslint-disable-next-line
import '@babel/polyfill';
// eslint-disable-next-line
import 'isomorphic-fetch';

// eslint-disable-next-line
import app from './app';
// eslint-disable-next-line
import { config } from './config';
// eslint-disable-next-line
import { connectDatabase } from './database';

(async () => {
  try {
    // eslint-disable-next-line
    await connectDatabase();
  } catch (error) {
    // eslint-disable-next-line
    console.error('Unable to connect to database');

    // eslint-disable-next-line
    // Exit Process if there is no Database Connection
    // eslint-disable-next-line
    process.exit(1);
  }
  // eslint-disable-next-line
  await app.listen(config.PORT);
  // eslint-disable-next-line
  console.log(`API started on port ${config.PORT}`);
})();
