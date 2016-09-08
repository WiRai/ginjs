'use strict';

var fs = require('fs-extra');
var path = require('path');

/**
 * @module module:featureman
 */

/**
 * @function getFeatureList
 * @description Get names of active features.
 * @returns {Array} Featurenames - Array containing names of all active features.
 */
function getFeatureList() {
  if (!process.env.PRODUCT_DIR) {
    return [];
  }
  var featureList = fs.readJSONSync(path.join(process.env.PRODUCT_DIR, 'features.json'));
  return featureList;
}

/**
 * @function getFeatures
 * @description Get a list of all active feature-modules
 * @returns {Array} Featurelist - Array containing all active feature-modules.
 */
function getFeatures() {
  var features = [];
  var featureList = getFeatureList();
  featureList.forEach(function (elem) {
    // noFlow whatever...
    features.push(require(elem)); // eslint-disable-line global-require
  });
  return features;
}

module.exports = {
  getFeatures: getFeatures,
  getFeatureList: getFeatureList
};