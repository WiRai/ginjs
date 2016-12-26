/* @flow */

// eslint-disable-next-line import/no-extraneous-dependencies
const expect = require('chai').expect;
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const tasks = require('./index').tasks;

// noFlow
describe('Function module', () => {
  // noFlow
  it('Functionholder to introduce and refine functions with superimp', () => {
    process.env.PRODUCTLINE_DIR = path.join(os.tmpdir(), '_ginjs-test-productline');
    process.env.PATH = `${process.env.PRODUCTLINE_DIR}/node_modules/.bin:${process.env.PATH || ''}`;
    process.env.NODE_PATH = `${process.env.PRODUCTLINE_DIR}/features:${process.env.PRODUCTLINE_DIR}/node_modules:${process.env.NODE_PATH || ''}`;
    // To be sure new NODE_PATH is used:
    // noFlow
    require('module').Module._initPaths(); // eslint-disable-line no-underscore-dangle, global-require

    process.chdir(os.tmpdir());
    tasks.createProductLine('_ginjs-test-productline');
    process.env.PRODUCT_DIR = path.join(process.env.PRODUCTLINE_DIR || '', 'products', 'default');
    // noFlow
    const gap = require('gap'); // eslint-disable-line global-require, import/no-extraneous-dependencies, import/no-unresolved

    gap.composables.functions.introduce_test = (): string => 'i introduced a function';
    gap.composables.functions.refine_getContextTemplate = (
      original: Function,
    ): Function => (): Object => {
      const tmpl = original();
      tmpl.refined = true;
      return tmpl;
    };
    fs.writeJSONSync(path.join(process.env.PRODUCT_DIR || '', 'features.json'), [
      './index', // to ensure ginjs is just loaded once through path
      'gap',
    ]);
    // eslint-disable-next-line global-require
    const functions = require('./index').functions;
    // eslint-disable-next-line no-unused-expressions
    expect(functions.test() === 'i introduced a function').to.be.true;
    // eslint-disable-next-line no-unused-expressions
    expect(functions.getContextTemplate().refined).to.be.true;
    fs.removeSync(process.env.PRODUCTLINE_DIR);
    delete process.env.PRODUCTLINE_DIR;
    delete process.env.PRODUCT_DIR;
    Object.keys(require.cache).forEach((elem: String) => {
      delete require.cache[elem];
    });
  });
});
