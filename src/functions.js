/**
 * @module module:functions
 */
const functions = {
  /**
   * @function getContextTemplate
   * @description Return context template as js obj.
   * @returns {Object} Template - Object representing th context template.
   */
  introduce_getContextTemplate: (): Object => { // eslint-disable-line arrow-body-style
    if (!process.env.PRODUCT_DIR) {
      throw new Error('No PRODUCT_DIR set.');
    }
    return {
      DATA_DIR: process.env.PRODUCT_DIR,
    };
  },
};

module.exports = functions;
