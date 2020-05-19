const babelJest = require('babel-jest');
const entriaBabel = require('@reat-api/babel');

module.exports = babelJest.createTransformer(entriaBabel);
