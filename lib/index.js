'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var registryHolder = require('./registryholder');

module.exports.register = registryHolder.register;

// noFlow
registryHolder.registry.product = registryHolder.register('product');

module.exports.settings = registryHolder.register('settings');
module.exports.functions = registryHolder.register('functions');
module.exports.tasks = registryHolder.register('tasks');

module.exports.featureman = require('./featureman');

module.exports.composables = {
  tasks: require('./tasks'), // eslint-disable-line global-require
  functions: require('./functions') };

if (process.env.PRODUCT_DIR) {
  // noFlow
  module.exports.context = registryHolder.registry.product.context = require('./context'); // eslint-disable-line global-require
}
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
var composableHolder = {};

// collect settings, functions, tasks to compose
features.forEach(function (feature) {
  if (feature.composables) {
    Object.keys(feature.composables).forEach(function (elem) {
      if (!(elem in registryHolder.registry)) {
        module.exports[elem] = registryHolder.register(elem);
      }
      if (!(elem in composableHolder)) {
        composableHolder[elem] = [];
      }
      composableHolder[elem].push(feature.composables[elem]);
    });
  }
});

Object.keys(composableHolder).forEach(function (key) {
  module.exports.product[key] = compose.apply(undefined, [true].concat(_toConsumableArray(composableHolder[key].reverse()), [registryHolder.registry[key]]));
});