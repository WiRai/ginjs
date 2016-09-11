/* @flow */

/**
 * @module module:product
 */

/** Object representing the product.*/

const product = {};
module.exports = product;

product.context = require('./context');

const functions = require('./functions');

// Finally derive product...
functions.deriveProduct();
