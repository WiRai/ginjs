jest.unmock('../lib/featureman');
jest.unmock('fs-extra');
jest.unmock('path');

const getFeatureList = require('../lib/featureman').getFeatureList;

describe('getFeatureList', () => {
  it('Returns list of the names of active features', () => {
    delete process.env.PRODUCT_DIR;
    expect(getFeatureList()).toEqual([]);
  });
});
