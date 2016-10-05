/* @flow */

// eslint-disable-next-line import/no-extraneous-dependencies
const expect = require('chai').expect;
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const tasks = require('./index').tasks;

// noFlow
describe('Settings module', () => {
  // noFlow
  it('Settingsholder to introduce and refine settings with superimp', () => {
    process.env.PRODUCTLINE_DIR = path.join(os.tmpdir(), '_ginjs-test-productline');
    process.env.PATH = `${process.env.PRODUCTLINE_DIR}/node_modules/.bin:${process.env.PATH || ''}`;
    process.env.NODE_PATH = `${process.env.PRODUCTLINE_DIR}/features:${process.env.PRODUCTLINE_DIR}/node_modules:${process.env.NODE_PATH || ''}`;
    // To be sure new NODE_PATH is used:
    // noFlow
    require('module').Module._initPaths(); // eslint-disable-line global-require, no-underscore-dangle

    process.chdir(os.tmpdir());
    tasks.createProductLine('_ginjs-test-productline');
    process.env.PRODUCT_DIR = path.join(process.env.PRODUCTLINE_DIR || '', 'products', 'default');
    tasks.createFeature('gap2');
    // noFlow
    const gap = require('gap'); // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved, global-require

    gap.composables.settings = {};
    gap.composables.settings.introduce_mySettings = true;
    gap.composables.settings.introduce_mySettings2 = false;
    // noFlow
    const gap2 = require('gap2'); // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved, global-require

    gap2.composables.settings = {};
    gap2.composables.settings.refine_mySettings2 = (): boolean => true;
    fs.writeJSONSync(path.join(process.env.PRODUCT_DIR || '', 'features.json'), [
      './index',
      'gap',
      'gap2',
    ]);
    // eslint-disable-next-line global-require
    const settings = require('./index').settings;
    // eslint-disable-next-line no-unused-expressions
    expect(settings.mySettings).to.be.true;
    // eslint-disable-next-line no-unused-expressions
    expect(settings.mySettings2).to.be.true;
    fs.removeSync(process.env.PRODUCTLINE_DIR);
    delete process.env.PRODUCTLINE_DIR;
    delete process.env.PRODUCT_DIR;
    Object.keys(require.cache).forEach((elem: String) => {
      delete require.cache[elem];
    });
  });
});
