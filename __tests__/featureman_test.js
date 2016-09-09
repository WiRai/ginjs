const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const getFeatureList = require('../lib/featureman').getFeatureList;
const getFeatures = require('../lib/featureman').getFeatures;
const tasks = require('../lib/tasks');

const skelPath = path.join(__dirname, '../.skel');

describe('getFeatureList', () => {
  it('Returns list of the names of active features', () => {
    expect(getFeatureList()).toEqual([]);
    process.env.PRODUCT_DIR = path.join(os.tmpdir(), '_ginjs-test-product');
    fs.copySync(path.join(skelPath, 'product'), process.env.PRODUCT_DIR);
    expect(getFeatureList()).toEqual(['gap']);
    fs.removeSync(process.env.PRODUCT_DIR);
    delete process.env.PRODUCT_DIR;
  });
});

describe('getFeatures', () => {
  it('Returns list of active features', () => {
    process.env.PRODUCTLINE_DIR = path.join(os.tmpdir(), '_ginjs-test-productline');
    process.chdir(os.tmpdir());
    tasks.createProductLine('_ginjs-test-productline');
    process.env.PRODUCT_DIR = path.join(process.env.PRODUCTLINE_DIR, 'products', 'default');
    const gap = require('gap');
    const featureList = getFeatures();
    expect(gap).toBe(featureList[0]);
    fs.removeSync(process.env.PRODUCTLINE_DIR);
    delete process.env.PRODUCTLINE_DIR;
    delete process.env.PRODUCT_DIR;
  });
});
