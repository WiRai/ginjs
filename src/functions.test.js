const expect = require('chai').expect;
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const tasks = require('../lib/tasks');

const skelPath = path.join(__dirname, '../.skel');

describe('Function module', () => {
  it('Functionholder to introduce and refine functions with superimp', () => {
    process.env.PRODUCTLINE_DIR = path.join(os.tmpdir(), '_ginjs-test-productline');
    process.env.PATH = `${process.env.PRODUCTLINE_DIR}/node_modules/.bin:${process.env.PATH}`;
    process.env.NODE_PATH = `${process.env.PRODUCTLINE_DIR}/features:${process.env.PRODUCTLINE_DIR}/node_modules:${process.env.NODE_PATH}`;
    // Tp be sure new NODE_PATH is used:
    require('module').Module._initPaths();
    process.chdir(os.tmpdir());
    tasks.createProductLine('_ginjs-test-productline');
    process.env.PRODUCT_DIR = path.join(process.env.PRODUCTLINE_DIR, 'products', 'default');
    /*
     * Reset modules because tasks.createProductLine forces composition
     * of functions module, but we change the features later dynamically.
     * To get those features composed we need this pattern...
     */
    delete require.cache[require.resolve('../lib/functions')];
    const gap = require('gap');
    gap.composables.functions.introduce_test = () => 'i introduced a function';
    gap.composables.functions.refine_deriveProduct = (original) => () => {
      const product = original();
      product.refined = true;
      return product;
    };
    const functions = require('../lib/functions');
    expect(functions.test() === 'i introduced a function').to.be.true;
    expect(functions.deriveProduct().refined).to.be.true;
    fs.removeSync(process.env.PRODUCTLINE_DIR);
    delete process.env.PRODUCTLINE_DIR;
    delete process.env.PRODUCT_DIR;
  });
});
