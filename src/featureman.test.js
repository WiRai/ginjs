/* @flow */

// eslint-disable-next-line import/no-extraneous-dependencies
const expect = require('chai').expect;
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const getFeatureList = require('../lib/featureman').getFeatureList;
const getFeatures = require('../lib/featureman').getFeatures;
const tasks = require('./index').tasks;

const skelPath = path.join(__dirname, '../.skel');

// noFlow
describe('getFeatureList', () => {
  // noFlow
  it('Returns list of the names of active features', () => {
    expect(getFeatureList().length).to.equal(0);
    process.env.PRODUCT_DIR = path.join(os.tmpdir(), '_ginjs-test-product');
    fs.copySync(path.join(skelPath, 'product'), process.env.PRODUCT_DIR);
    // eslint-disable-next-line no-unused-expressions
    expect(getFeatureList()[0]).to.equal('ginjs');
    // eslint-disable-next-line no-unused-expressions
    expect(getFeatureList()[1]).to.equal('gap');
    fs.removeSync(process.env.PRODUCT_DIR);
    delete process.env.PRODUCT_DIR;
    Object.keys(require.cache).forEach((elem: String) => {
      delete require.cache[elem];
    });
  });
});

describe('getFeatures', () => {
  // noFlow
  it('Returns list of active features', () => {
    process.env.PRODUCTLINE_DIR = path.join(os.tmpdir(), '_ginjs-test-productline');
    process.env.PATH = process.env.PATH;
    process.env.PATH = `${process.env.PRODUCTLINE_DIR}/node_modules/.bin:${process.env.PATH || ''}`;
    process.env.NODE_PATH = `${process.env.PRODUCTLINE_DIR}/features:${process.env.PRODUCTLINE_DIR}/node_modules:${process.env.NODE_PATH || ''}`;
    // To be sure new NODE_PATH is used:
    // noFlow
    require('module').Module._initPaths(); // eslint-disable-line no-underscore-dangle, global-require

    process.chdir(os.tmpdir());
    tasks.createProductLine('_ginjs-test-productline');
    process.env.PRODUCT_DIR = path.join(process.env.PRODUCTLINE_DIR || '', 'products', 'default');
    // noFlow
    const gap = require('gap'); // eslint-disable-line import/no-unresolved, global-require, import/no-extraneous-dependencies

    fs.writeJSONSync(path.join(process.env.PRODUCT_DIR || '', 'features.json'), [
      './index', // to ensure ginjs is just loaded once through path
      'gap',
    ]);
    const featureList = getFeatures();
    // eslint-disable-next-line no-unused-expressions
    expect(gap === featureList[1]).to.be.true;
    fs.removeSync(process.env.PRODUCTLINE_DIR);
    delete process.env.PRODUCTLINE_DIR;
    delete process.env.PRODUCT_DIR;
    Object.keys(require.cache).forEach((elem: String) => {
      delete require.cache[elem];
    });
  });
});
