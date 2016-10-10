'use strict';

var path = require('path');

if (!process.env.PRODUCT_DIR) {
  throw new Error('No PRODUCT_DIR set.');
}

// Try to load the context...
try {
  module.exports = Object.freeze(
  // noFlow
  require( // eslint-disable-line import/no-dynamic-require, global-require
  path.join(process.env.PRODUCT_DIR, 'context.json')));
} catch (e) {
  throw new Error('Could not load context.json');
}