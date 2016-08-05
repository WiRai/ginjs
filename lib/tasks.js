"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/** @module */

var tasks = exports.tasks = {
  /**
   * @description Print function..
   * @param {Array} arr - Array containing all given arguments to print..
   * @returns {void} Void.
   */
  print: function print(arr) {
    var _console;

    return (_console = console).log.apply(_console, _toConsumableArray(arr));
  }
};
