/* @flow */

const path = require('path');
const fs = require('fs-extra');

/**
 * @module module:product
 */

/** Object representing the product.*/
module.exports = {};

if (!process.env.PRODUCT_DIR) {
  throw new Error('No PRODUCT_DIR set.');
}

// Try to load the context...
try {
  module.exports.context = Object.freeze(
    fs.readJSONSync(
      path.join(
        process.env.PRODUCT_DIR,
        'context.json'
      )
    )
  );
} catch (e) {
  throw new Error('Could not load context.json');
}

const functions = require('./functions');

// Finally derive product...
functions.deriveProduct();
