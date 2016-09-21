module.exports.settings = require('./lib/settings');
module.exports.functions = require('./lib/functions');
module.exports.tasks = require('./lib/tasks');
module.exports.featureman = require('./lib/featureman');

if (process.env.PRODUCT_DIR) {
  module.exports.context = require('./lib/context');
  module.exports.product = require('./lib/product');
}
