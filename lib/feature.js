'use strict';

var fs = require('fs-extra');
var path = require('path');

function getFeatureList() {
  if (!process.env.PRODUCT_DIR) {
    throw new Error('No Product selected');
  }
  var featureList = fs.readJSONSync(path.join(process.env.PRODUCT_DIR, 'features.json'));
  return featureList;
}

function getFeatures() {
  var features = [];
  var featureList = getFeatureList();
  featureList.forEach(function (elem) {
    features.push(require(elem));
  });
  return features;
}

module.exports = {
  getFeatures: getFeatures,
  getFeatureList: getFeatureList
};