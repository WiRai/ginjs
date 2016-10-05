"use strict";

var registry = {};

/**
 * @function register
 * @description Register composable object.
 * @param {string} name - Name of the new object.
 * @returns {Object} Tasks can return anything.
 */
function register(name) {
  if (name in registry) {
    throw new Error(name + " already in gin's registry");
  }
  registry[name] = {};
  return registry[name];
}

module.exports = {
  registry: registry,
  register: register
};