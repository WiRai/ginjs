'use strict';

var path = require('path');
var fs = require('fs-extra');
var nunjucks = require('nunjucks');

var skelPath = path.join(__dirname, '../.skel');
var templatePath = path.join(__dirname, '../.templates');

var functionRegistry = require('./index').functions;
var taskRegistry = require('./index').tasks;

/**
 * @module module:tasks
 */
var tasks = {
  /**
   * @function createFeature
   * @description Create new feature.
   * @param {string} featureName - Name of the new feature.
   * @returns {void} Void.
   */
  introduce_createFeature: function introduce_createFeature(featureName) {
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
  introduce_createProduct: function introduce_createProduct(productName) {
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
    fs.mkdirSync(path.join(PRODUCT_DIR, 'DATA'));
    process.env.PRODUCT_DIR = PRODUCT_DIR;
    fs.mkdirSync(path.join(PRODUCT_DIR, 'data'));
    taskRegistry.updateContext();
  },
  /**
   * @function createProductLine
   * @description Create new productline.
   * @param {string} name - Name of the new productline.
   * @returns {void} Void.
   */
  introduce_createProductLine: function introduce_createProductLine(name) {
    var newProductLineDir = path.join(process.cwd(), name);
    process.env.PRODUCTLINE_DIR = newProductLineDir;
    // noFlow
    process.env.PATH = newProductLineDir + '/node_modules/.bin:' + process.env.PATH;
    // noFlow
    process.env.NODE_PATH = newProductLineDir + '/features:' + newProductLineDir + '/node_modules:' + process.env.NODE_PATH;
    // To be sure new NODE_PATH is used:
    // noFlow
    require('module').Module._initPaths(); // eslint-disable-line global-require, no-underscore-dangle

    if (fs.existsSync(newProductLineDir)) {
      if (fs.readdirSync(newProductLineDir).length > 0) {
        throw new Error('Dir already exists.');
      }
    }
    fs.mkdirSync(newProductLineDir);
    fs.mkdirSync(path.join(newProductLineDir, 'features'));
    fs.mkdirSync(path.join(newProductLineDir, 'products'));
    taskRegistry.createFeature('gap');
    taskRegistry.createProduct('default');
  },
  /**
   * @function help
   * @description List available tasks.
   * @returns {void} Void.
   */
  introduce_help: function introduce_help() {
    return console.log(taskRegistry);
  }, // eslint-disable-line no-console
  /**
   * @function showProduct
   * @description Print product.
   * @returns {void} Void.
   */
  introduce_showProduct: function introduce_showProduct() {
    return console.log(require('./index').product);
  }, // eslint-disable-line global-require, no-console
  introduce_updateContext: function introduce_updateContext() {
    if (!process.env.PRODUCT_DIR) {
      throw new Error('No PRODUCT_DIR set.');
    }
    var newContext = Object.assign(functionRegistry.getContextTemplate(), require('./context'));
    fs.writeJSONSync(path.join(
    // noFlow
    process.env.PRODUCT_DIR, 'context.json'), newContext);
  }
};

module.exports = tasks;