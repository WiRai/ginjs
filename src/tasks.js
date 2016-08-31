/* @flow */

const compose = require('superimp');
const path = require('path');
const fs = require('fs-extra');
const skelPath = path.join(__dirname, '../.skel');
const templatePath = path.join(__dirname, '../.templates');
const nunjucks = require('nunjucks');
const getFeatures = require('./feature').getFeatures;

const tasks : Object = module.exports = {
  createFeature: (featureName: string) => {
    if (!process.env.PRODUCTLINE_DIR) {
      throw new Error('No Productline set');
    }
    const featurePath = path.join(process.env.PRODUCTLINE_DIR, 'features', featureName);
    if (fs.existsSync(featurePath)) {
      throw new Error('feature already exists');
    }
    fs.copySync(path.join(skelPath, 'feature'), featurePath);
  },
  createProduct: (productName: string) => {
    if (!process.env.PRODUCTLINE_DIR) {
      throw new Error('No Productline set');
    }
    const PRODUCT_DIR = path.join(process.env.PRODUCTLINE_DIR, 'products', productName);
    if (fs.existsSync(PRODUCT_DIR)) {
      throw new Error('PRODUCT_DIR already exists');
    }
    fs.copySync(path.join(skelPath, 'product'), PRODUCT_DIR);
    nunjucks.configure(templatePath, { autoescape: true });
    const activate = nunjucks.render(
      'activate.njk', { PRODUCTLINE_DIR: process.env.PRODUCTLINE_DIR, PRODUCT_DIR }
    );
    fs.writeFileSync(path.join(PRODUCT_DIR, 'activate'), activate);
  },
  createProductLine: (name: string) => {
    const newProductLineDir: string = path.join(process.cwd(), name);
    process.env.PRODUCTLINE_DIR = newProductLineDir;
    if (fs.existsSync(newProductLineDir)) {
      throw new Error('Dir already exists');
    }
    fs.copySync(path.join(skelPath, 'productline'), newProductLineDir);
    tasks.createProduct('.skelProduct');
    tasks.createFeature('gap');
  },
  deriveProduct: (): Object => {
    if (!process.env.PRODUCT_DIR) {
      throw new Error('No Product selected');
    }
    product.tasks = tasks;
    return product;
  },
  help: () => console.log(tasks),
};

const features = getFeatures();
const taskList = [];
features.forEach((feature: Object) => {
  if (feature.composables.tasks) {
    taskList.push(feature.composables.tasks);
  }
});

compose(...taskList.reverse(), tasks);
