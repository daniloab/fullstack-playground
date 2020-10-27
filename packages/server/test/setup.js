const fs = require('fs');
const { join } = require('path');

const MMS = require('mongodb-memory-server-global');

const cwd = process.cwd();

const globalConfigPath = join(cwd, 'globalConfig.json');

// eslint-disable-next-line
const { default: MongodbMemoryServer, MongoMemoryReplSet } = MMS;

const mongod = new MongodbMemoryServer({
  binary: {
    version: '4.2.7',
    skipMD5: true,
  },
  // debug: true,
  autoStart: false,
});

module.exports = async () => {
  if (!mongod.isRunning) {
    await mongod.start();
  }

  const mongoConfig = {
    mongoUri: await mongod.getUri(),
  };

  // save mongo uri to be reused in each test
  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));

  global.__MONGOD__ = mongod;
};
