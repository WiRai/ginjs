'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var registryHolder = require('./registryholder');

// noFlow
registryHolder.registry.product = registryHolder.register('product');
// noFlow
module.exports.settings = registryHolder.registry.product.settings = registryHolder.register('settings');
// noFlow
module.exports.functions = registryHolder.registry.product.functions = registryHolder.register('functions');
// noFlow
module.exports.tasks = registryHolder.registry.product.tasks = registryHolder.register('tasks');

module.exports.featureman = require('./featureman');
module.exports.composables = require('./composables');

// eslint-disable-next-line global-require
// module.exports.context = require('./context');
// noFlow
module.exports.product = registryHolder.registry.product; // eslint-disable-line global-require

var compose = require('superimp');

var getFeatures = module.exports.featureman.getFeatures;

// get active features in a list
var features = getFeatures();
if (!features.length) {
  features.push({
    composables: module.exports.composables
  });
}
var functionList = [];
var taskList = [];
var settingsList = [];

// collect settings, functions, tasks to compose
features.forEach(function (feature) {
  if (feature.composables) {
    if (feature.composables.settings) {
      settingsList.push(feature.composables.settings);
    }
    if (feature.composables.functions) {
      functionList.push(feature.composables.functions);
    }
    if (feature.composables.tasks) {
      taskList.push(feature.composables.tasks);
    }
  }
});

// compose composables for each feature on ginjs import
compose.apply(undefined, [true].concat(_toConsumableArray(settingsList.reverse()), [module.exports.settings]));
compose.apply(undefined, [true].concat(_toConsumableArray(functionList.reverse()), [module.exports.functions]));
compose.apply(undefined, [true].concat(_toConsumableArray(taskList.reverse()), [module.exports.tasks]));