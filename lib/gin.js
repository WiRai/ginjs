'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @module module:gin
 */

var tasks = require('./index').tasks;

/**
 * @function gin
 * @description Console function to invoke tasks.
 * @param {...strings} args - Console input.
 * @returns {any} Tasks can return anything.
 */
function gin() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var consoleArgs = args.slice(3);
  if (tasks[args[2]]) {
    return tasks[args[2]].apply(tasks, _toConsumableArray(consoleArgs));
  }
  // eslint-disable-next-line no-console
  console.log('Could not proceed.');
  return tasks.help();
}

// start gin from command line
gin.apply(undefined, _toConsumableArray(process.argv));