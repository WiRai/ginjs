'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/** @module */

var tasks = require('./tasks').tasks;

/**
 * @description Console function to invoke tasks.
 * @param {Array} args - Console input.
 * @returns {any} Tasks can return anything.
 */
function gin() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var consoleArgs = args.slice(3);
  if (tasks[args[2]]) {
    return tasks[args[2]](consoleArgs);
  }
  return void 0;
}

gin.apply(undefined, _toConsumableArray(process.argv));