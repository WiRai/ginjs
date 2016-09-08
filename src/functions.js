/* @flow */

const compose = require('superimp');
const getFeatures = require('./featureman').getFeatures;

/**
 * @module module:functions
 */
const functions : Object = module.exports = {
  /**
   * @function deriveProduct
   * @description Derive importable product.
   * @returns {Object} Product - Object as the composed product.
   */
  deriveProduct: (): Object => {
    const product = require('./product'); // eslint-disable-line global-require
    const tasks = require('./tasks'); // eslint-disable-line global-require
    if (!process.env.PRODUCT_DIR) {
      throw new Error('No PRODUCT_DIR set.');
    }
    // noFlow whatever...
    product.functions = functions;
    // noFlow whatever...
    product.tasks = tasks;
    return product;
  },
};

// get active features in a list
const features = getFeatures();
const functionList = [];
features.forEach((feature: Object) => {
  if (feature.composables.functions) {
    functionList.push(feature.composables.functions);
  }
});

// compose functions for each feature on first import
compose(...functionList.reverse(), functions);
