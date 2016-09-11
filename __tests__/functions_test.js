const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const tasks = require('../lib/tasks');

const skelPath = path.join(__dirname, '../.skel');

describe('Function module', () => {
  it('Functionholder to introduce and refine functions with superimp', () => {
    process.env.PRODUCTLINE_DIR = path.join(os.tmpdir(), '_ginjs-test-productline');
    process.chdir(os.tmpdir());
    tasks.createProductLine('_ginjs-test-productline');
    process.env.PRODUCT_DIR = path.join(process.env.PRODUCTLINE_DIR, 'products', 'default');
    /*
     * Reset modules because tasks.createProductLine forces composition
     * of functions module, but we change the features later dynamically.
     * To get those features composed we need this pattern...
     */
    jest.resetModules();
    const gap = require('gap');
    gap.composables.functions.introduce_test = () => 'i introduced a function';
    gap.composables.functions.refine_deriveProduct = (original) => () => {
      const product = original();
      product.refined = true;
      return product;
    };
    const functions = require('../lib/functions');
    expect(functions.test()).toBe('i introduced a function');
    expect(functions.deriveProduct().refined).toBe(true);
    fs.removeSync(process.env.PRODUCTLINE_DIR);
    delete process.env.PRODUCTLINE_DIR;
    delete process.env.PRODUCT_DIR;
  });
});
