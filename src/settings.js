/* @flow */

const compose = require('superimp');
const getFeatures = require('./featureman').getFeatures;

/**
 * @module module:settings
 */
const settings : Object = module.exports = {};

// get active features in a list
const features = getFeatures();
const settingsList = [];
features.forEach((feature: Object) => {
  if (feature.composables.settings) {
    settingsList.push(feature.composables.settings);
  }
});

// compose tasks for each feature on first import
compose(...settingsList.reverse(), settings);
