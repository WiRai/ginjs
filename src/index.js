/* @flow */

const registryHolder = require('./registryholder');

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

const compose = require('superimp');

const getFeatures = module.exports.featureman.getFeatures;

// get active features in a list
const features = getFeatures();
if (!features.length) {
  features.push({
    composables: module.exports.composables,
  });
}
const functionList = [];
const taskList = [];
const settingsList = [];

// collect settings, functions, tasks to compose
features.forEach((feature: Object) => {
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
compose(true, ...settingsList.reverse(), module.exports.settings);
compose(true, ...functionList.reverse(), module.exports.functions);
compose(true, ...taskList.reverse(), module.exports.tasks);
