jest.unmock('../lib/featureman');

const getFeatureList = require('../lib/featureman').getFeatureList;

describe('getFeatureList', () => {
  it('Returns list of the names of active features', () => {
    delete process.env.PRODUCT_DIR;
    expect(getFeatureList()).toEqual([]);
  });
});
