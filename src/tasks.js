/* @flow */

/**
 * @module module:tasks
 * @exports tasks
*/

/**
 * @constant
 * @type {object}
 * @default
 */
export const tasks : Object = {
  /**
   * @function print
   * @description Print function.
   * @param {Array} arr - Array containing all given arguments to print.
   * @returns {void} Void.
   */
  print: (arr: Array<any>) : void => console.log(...arr),
};
