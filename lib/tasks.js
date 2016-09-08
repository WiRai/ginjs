'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var compose = require('superimp');
var path = require('path');
var fs = require('fs-extra');
var skelPath = path.join(__dirname, '../.skel');
var templatePath = path.join(__dirname, '../.templates');
var nunjucks = require('nunjucks');
var getFeatures = require('./featureman').getFeatures;

/**
 * @module module:tasks
 */
var tasks = module.exports = {
  /**
   * @function createFeature
   * @description Create new feature.
   * @param {string} featureName - Name of the new feature.
   * @returns {void} Void.
   */
  createFeature: function createFeature(featureName) {
    if (!process.env.PRODUCTLINE_DIR) {
      throw new Error('No PRODUCTLINE_DIR set.');
    }
    var featurePath = path.join(process.env.PRODUCTLINE_DIR, 'features', featureName);
    if (fs.existsSync(featurePath)) {
      throw new Error('Feature already exists.');
    }
    fs.copySync(path.join(skelPath, 'feature'), featurePath);
  },
  /**
   * @function createProduct
   * @description Create new product.
   * @param {string} productName - Name of the new product.
   * @returns {void} Void.
   */
  createProduct: function createProduct(productName) {
    if (!process.env.PRODUCTLINE_DIR) {
      throw new Error('No PRODUCTLINE_DIR set.');
    }
    var PRODUCT_DIR = path.join(process.env.PRODUCTLINE_DIR, 'products', productName);
    if (fs.existsSync(PRODUCT_DIR)) {
      throw new Error('PRODUCT_DIR already exists.');
    }
    fs.copySync(path.join(skelPath, 'product'), PRODUCT_DIR);
    nunjucks.configure(templatePath, { autoescape: true });
    var activate = nunjucks.render('activate.njk', { PRODUCTLINE_DIR: process.env.PRODUCTLINE_DIR, PRODUCT_DIR: PRODUCT_DIR });
    fs.writeFileSync(path.join(PRODUCT_DIR, 'activate'), activate);
  },
  /**
   * @function createProductLine
   * @description Create new productline.
   * @param {string} name - Name of the new productline.
   * @returns {void} Void.
   */
  createProductLine: function createProductLine(name) {
    var newProductLineDir = path.join(process.cwd(), name);
    process.env.PRODUCTLINE_DIR = newProductLineDir;
    if (fs.existsSync(newProductLineDir)) {
      throw new Error('Dir already exists.');
    }
    fs.copySync(path.join(skelPath, 'productline'), newProductLineDir);
    tasks.createProduct('default');
    tasks.createFeature('gap');
  },
  /**
   * @function help
   * @description List available tasks.
   * @returns {void} Void.
   */
  help: function help() {
    return console.log(tasks);
  },
  /**
   * @function showProduct
   * @description Print product.
   * @returns {void} Void.
   */
  showProduct: function showProduct() {
    return console.log(require('./product'));
  }
};

// get active features in a list
var features = getFeatures();
var taskList = [];
features.forEach(function (feature) {
  if (feature.composables.tasks) {
    taskList.push(feature.composables.tasks);
  }
});

// compose tasks for each feature on first import
compose.apply(undefined, _toConsumableArray(taskList.reverse()).concat([tasks]));