/* @flow */

const registryHolder = require('./registryholder');

module.exports.register = registryHolder.register;

// noFlow
registryHolder.registry.product = registryHolder.register('product');

module.exports.settings = registryHolder.register('settings');
module.exports.functions = registryHolder.register('functions');
module.exports.tasks = registryHolder.register('tasks');

module.exports.featureman = require('./featureman');

module.exports.composables = {
  tasks: require('./tasks'), // eslint-disable-line global-require
  functions: require('./functions'), // eslint-disable-line global-require
};

if (process.env.PRODUCT_DIR) {
  // noFlow
  module.exports.context = registryHolder.registry.product.context = require('./context'); // eslint-disable-line global-require
}
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
const composableHolder = {};

// collect settings, functions, tasks to compose
features.forEach((feature: Object) => {
  if (feature.composables) {
    Object.keys(feature.composables).forEach((elem: string) => {
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

Object.keys(composableHolder).forEach((key: string) => {
  module.exports.product[key] = compose(
    true,
    ...composableHolder[key].reverse(),
    registryHolder.registry[key],
  );
});
