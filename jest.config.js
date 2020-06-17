module.exports = {
  projects: [
    '<rootDir>/packages/server/jest.config.js',
    '<rootDir>/packages/web/jest.config.js',
    //  eslint-disable-next-line
    // '<rootDir>/workshop/10-testUsePreloadQuery/jest.config.js',
    // '<rootDir>/workshop/11-testUseFragment/jest.config.js',
  ],
  transform: {
    '^.+\\.(js|ts|tsx)?$': require('path').resolve('./customBabelTransformer'),
  },
  moduleFileExtensions: ['js', 'css', 'ts', 'tsx'],
  moduleNameMapper: {
    '^@workshop/graphql$': '<rootDir>/packages/graphql/src/index.ts',
  },
};