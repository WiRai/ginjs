'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var compose = require('superimp');
var getFeatures = require('./featureman').getFeatures;

/**
 * @module module:functions
 */
var functions = module.exports = {
  /**
   * @function deriveProduct
   * @description Derive importable product.
   * @returns {Object} Product - Object as the composed product.
   */
  deriveProduct: function deriveProduct() {
    var product = require('./product'); // eslint-disable-line global-require
    var tasks = require('./tasks'); // eslint-disable-line global-require
    if (!process.env.PRODUCT_DIR) {
      throw new Error('No PRODUCT_DIR set.');
    }
    // noFlow whatever...
    product.functions = functions;
    // noFlow whatever...
    product.tasks = tasks;
    return product;
  }
};

// get active features in a list
var features = getFeatures();
var functionList = [];
features.forEach(function (feature) {
  if (feature.composables.functions) {
    functionList.push(feature.composables.functions);
  }
});

// compose functions for each feature on first import
compose.apply(undefined, _toConsumableArray(functionList.reverse()).concat([functions]));