const config = require('@rest-api/babel');

const { createTransformer } = require('babel-jest');

module.exports = createTransformer({
  ...config,
});
