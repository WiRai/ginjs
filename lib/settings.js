'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var compose = require('superimp');
var getFeatures = require('./featureman').getFeatures;

/**
 * @module module:settings
 */
var settings = module.exports = {};

// get active features in a list
var features = getFeatures();
var settingsList = [];
features.forEach(function (feature) {
  if (feature.composables.settings) {
    settingsList.push(feature.composables.settings);
  }
});

// compose tasks for each feature on first import
compose.apply(undefined, _toConsumableArray(settingsList.reverse()).concat([settings]));