/* @flow */

const compose = require('superimp');
const path = require('path');
const fs = require('fs-extra');
const skelPath = path.join(__dirname, '../.skel');
const templatePath = path.join(__dirname, '../.templates');
const nunjucks = require('nunjucks');
const getFeatures = require('./featureman').getFeatures;

/**
 * @module module:tasks
 */
const tasks : Object = module.exports = {
  /**
   * @function createFeature
   * @description Create new feature.
   * @param {string} featureName - Name of the new feature.
   * @returns {void} Void.
   */
  createFeature: (featureName: string) => {
    if (!process.env.PRODUCTLINE_DIR) {
      throw new Error('No PRODUCTLINE_DIR set.');
    }
    const featurePath = path.join(process.env.PRODUCTLINE_DIR, 'features', featureName);
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
  createProduct: (productName: string) => {
    if (!process.env.PRODUCTLINE_DIR) {
      throw new Error('No PRODUCTLINE_DIR set.');
    }
    const PRODUCT_DIR = path.join(process.env.PRODUCTLINE_DIR, 'products', productName);
    if (fs.existsSync(PRODUCT_DIR)) {
      throw new Error('PRODUCT_DIR already exists.');
    }
    fs.copySync(path.join(skelPath, 'product'), PRODUCT_DIR);
    nunjucks.configure(templatePath, { autoescape: true });
    const activate = nunjucks.render(
      'activate.njk', { PRODUCTLINE_DIR: process.env.PRODUCTLINE_DIR, PRODUCT_DIR }
    );
    fs.writeFileSync(path.join(PRODUCT_DIR, 'activate'), activate);
  },
  /**
   * @function createProductLine
   * @description Create new productline.
   * @param {string} name - Name of the new productline.
   * @returns {void} Void.
   */
  createProductLine: (name: string) => {
    const newProductLineDir: string = path.join(process.cwd(), name);
    process.env.PRODUCTLINE_DIR = newProductLineDir;
    if (fs.existsSync(newProductLineDir)) {
      throw new Error('Dir already exists.');
    }
    fs.mkdirSync(newProductLineDir);
    fs.mkdirSync(path.join(newProductLineDir, 'features'));
    fs.mkdirSync(path.join(newProductLineDir, 'products'));
    tasks.createProduct('default');
    tasks.createFeature('gap');
  },
  /**
   * @function help
   * @description List available tasks.
   * @returns {void} Void.
   */
  help: (): void => console.log(tasks),
  /**
   * @function showProduct
   * @description Print product.
   * @returns {void} Void.
   */
  showProduct: (): void => console.log(require('./product')),
};

// get active features in a list
const features = getFeatures();
const taskList = [];
features.forEach((feature: Object) => {
  if (feature.composables.tasks) {
    taskList.push(feature.composables.tasks);
  }
});

// compose tasks for each feature on first import
compose(...taskList.reverse(), tasks);
