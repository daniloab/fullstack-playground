const config = require('@fp/babel');

const { createTransformer } = require('babel-jest');

module.exports = createTransformer({
  ...config,
});
