module.exports = {
  projects: [
    '<rootDir>/packages/api/jest.config.js',
    '<rootDir>/packages/server/jest.config.js',
    '<rootDir>/packages/notification/jest.config.js',
  ],
  transform: {
    '^.+\\.(js|ts|tsx)?$': require('path').resolve('./customBabelTransformer'),
  },
  moduleFileExtensions: ['js', 'css', 'ts', 'tsx'],
};
