'use strict';

/**
 * @module module:product
 */

/** Object representing the product.*/

var product = {};
module.exports = product;

product.context = require('./context');

var functions = require('./functions');

// Finally derive product...
functions.deriveProduct();