'use strict';

// eslint-disable-next-line import/no-extraneous-dependencies
var expect = require('chai').expect;
var fs = require('fs-extra');
var path = require('path');
var os = require('os');
var tasks = require('./index').tasks;

// noFlow
describe('Function module', function () {
  // noFlow
  it('Functionholder to introduce and refine functions with superimp', function () {
    process.env.PRODUCTLINE_DIR = path.join(os.tmpdir(), '_ginjs-test-productline');
    process.env.PATH = process.env.PRODUCTLINE_DIR + '/node_modules/.bin:' + (process.env.PATH || '');
    process.env.NODE_PATH = process.env.PRODUCTLINE_DIR + '/features:' + process.env.PRODUCTLINE_DIR + '/node_modules:' + (process.env.NODE_PATH || '');
    // To be sure new NODE_PATH is used:
    // noFlow
    require('module').Module._initPaths(); // eslint-disable-line no-underscore-dangle, global-require

    process.chdir(os.tmpdir());
    tasks.createProductLine('_ginjs-test-productline');
    process.env.PRODUCT_DIR = path.join(process.env.PRODUCTLINE_DIR || '', 'products', 'default');
    /*
     * Reset function module because tasks.createProductLine forces composition
     * of functions module, but we change the features later dynamically.
     * To get those features composed we need this pattern...
     */
    var gap = require('gap'); // eslint-disable-line global-require, import/no-extraneous-dependencies, import/no-unresolved

    gap.composables.functions.introduce_test = function () {
      return 'i introduced a function';
    };
    gap.composables.functions.refine_getContextTemplate = function (original) {
      return function () {
        var tmpl = original();
        tmpl.refined = true;
        return tmpl;
      };
    };
    // eslint-disable-next-line global-require
    var functions = require('./index').functions;
    // eslint-disable-next-line no-unused-expressions
    expect(functions.test() === 'i introduced a function').to.be.true;
    // eslint-disable-next-line no-unused-expressions
    expect(functions.getContextTemplate().refined).to.be.true;
    fs.removeSync(process.env.PRODUCTLINE_DIR);
    delete process.env.PRODUCTLINE_DIR;
    delete process.env.PRODUCT_DIR;
    Object.keys(require.cache).forEach(function (elem) {
      delete require.cache[elem];
    });
  });
});