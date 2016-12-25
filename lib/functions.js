'use strict';

var path = require('path');

/**
 * @module module:functions
 */
var functions = {
  /**
   * @function getContextTemplate
   * @description Return context template as js obj.
   * @returns {Object} Template - Object representing th context template.
   */
  introduce_getContextTemplate: function introduce_getContextTemplate() {
    // eslint-disable-line arrow-body-style
    if (!process.env.PRODUCT_DIR) {
      throw new Error('No PRODUCT_DIR set.');
    }
    return {
      DATA_DIR: path.join(process.env.PRODUCT_DIR, 'data')
    };
  }
};

module.exports = functions;