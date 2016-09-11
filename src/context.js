/* @flow */

const path = require('path');
const fs = require('fs-extra');

if (!process.env.PRODUCT_DIR) {
  throw new Error('No PRODUCT_DIR set.');
}

// Try to load the context...
try {
  module.exports = Object.freeze(
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
