const expect = require('chai').expect;
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const tasks = require('../lib/tasks');

const skelPath = path.join(__dirname, '../.skel');

describe('Settings module', () => {
  it('Settingsholder to introduce and refine settings with superimp', () => {
    process.env.PRODUCTLINE_DIR = path.join(os.tmpdir(), '_ginjs-test-productline');
    process.env.PATH = `${process.env.PRODUCTLINE_DIR}/node_modules/.bin:${process.env.PATH}`;
    process.env.NODE_PATH = `${process.env.PRODUCTLINE_DIR}/features:${process.env.PRODUCTLINE_DIR}/node_modules:${process.env.NODE_PATH}`;
    // To be sure new NODE_PATH is used:
    require('module').Module._initPaths();
    process.chdir(os.tmpdir());
    tasks.createProductLine('_ginjs-test-productline');
    process.env.PRODUCT_DIR = path.join(process.env.PRODUCTLINE_DIR, 'products', 'default');
    tasks.createFeature('gap2');
    const gap = require('gap');
    gap.composables.settings = {};
    gap.composables.settings.introduce_mySettings = true;
    gap.composables.settings.introduce_mySettings2 = false;
    const gap2 = require('gap2');
    gap2.composables.settings = {};
    gap2.composables.settings.refine_mySettings2 = () => true;
    fs.writeJSONSync(path.join(process.env.PRODUCT_DIR, 'features.json'), [
      'gap',
      'gap2',
    ]);
    // Because import of product forces composition of settings an we change gap and gap2 hot:
    delete require.cache[require.resolve('../index')]; // ginjs
    delete require.cache[require.resolve('ginjs/lib/settings')];    
    const settings = require('../lib/settings');
    expect(settings.mySettings).to.be.true;
    expect(settings.mySettings2).to.be.true;
    fs.removeSync(process.env.PRODUCTLINE_DIR);
    delete process.env.PRODUCTLINE_DIR;
    delete process.env.PRODUCT_DIR;
  });
});
