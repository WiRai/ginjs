/* @flow */

/**
 * @module module:gin
 */

 /**
  * Import task module
  * @constant
  * @type {object}
  * @default
  */
const tasks : Object = require('./index').tasks;

/**
 * @function gin
 * @description Console function to invoke tasks.
 * @param {...strings} args - Console input.
 * @returns {any} Tasks can return anything.
 */
function gin(...args: Array<mixed>) : mixed {
  const consoleArgs = args.slice(3);
  if (tasks[args[2]]) {
    return tasks[args[2]](...consoleArgs);
  }
  // eslint-disable-next-line no-console
  console.log('Could not proceed.');
  return tasks.help();
}

// start gin from command line
gin(...process.argv);
