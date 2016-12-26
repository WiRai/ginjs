/* @flow */

const path = require('path');
const fs = require('fs-extra');
const nunjucks = require('nunjucks');

const skelPath = path.join(__dirname, '../.skel');
const templatePath = path.join(__dirname, '../.templates');

const functionRegistry = require('./index').functions;
const taskRegistry = require('./index').tasks;

/**
 * @module module:tasks
 */
const tasks = {
  /**
   * @function createFeature
   * @description Create new feature.
   * @param {string} featureName - Name of the new feature.
   * @returns {void} Void.
   */
  introduce_createFeature: (featureName: string) => {
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
  introduce_createProduct: (productName: string) => {
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
      'activate.njk', {},
    );
    fs.writeFileSync(path.join(PRODUCT_DIR, 'activate'), activate);
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
  introduce_createProductLine: (name: string) => {
    const newProductLineDir: string = path.join(process.cwd(), name);
    process.env.PRODUCTLINE_DIR = newProductLineDir;
    // noFlow
    process.env.PATH = `${newProductLineDir}/node_modules/.bin:${process.env.PATH}`;
    // noFlow
    process.env.NODE_PATH = `${newProductLineDir}/features:${newProductLineDir}/node_modules:${process.env.NODE_PATH}`;
    // To be sure new NODE_PATH is used:
    // noFlow
    require('module').Module._initPaths(); // eslint-disable-line global-require, no-underscore-dangle

    if (fs.existsSync(newProductLineDir)) {
      const dirContentList = fs.readdirSync(newProductLineDir);
      const allowedContent = ['node_modules', 'package.json'];
      dirContentList.forEach((elem: String) => {
        if (allowedContent.indexOf(elem) === -1) {
          throw new Error('Dir already has unexpected content.');
        }
      });
    } else {
      fs.mkdirSync(newProductLineDir);
    }
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
  introduce_help: (): void => console.log(taskRegistry), // eslint-disable-line no-console
  /**
   * @function showProduct
   * @description Print product.
   * @returns {void} Void.
   */
  introduce_showProduct: (): void => console.log(require('./index').product), // eslint-disable-line global-require, no-console
  introduce_updateContext: () => {
    if (!process.env.PRODUCT_DIR) {
      throw new Error('No PRODUCT_DIR set.');
    }
    const newContext = Object.assign(
      functionRegistry.getContextTemplate(),
      require('./context'), //eslint-disable-line global-require
    );
    fs.writeJSONSync(
      path.join(
        // noFlow
        process.env.PRODUCT_DIR,
        'context.json',
      ),
      newContext,
    );
  },
};

module.exports = tasks;
