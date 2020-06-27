const config = require('@fullstack-playground/babel');

const { createTransformer } = require('babel-jest');

module.exports = createTransformer({
  ...config,
});
