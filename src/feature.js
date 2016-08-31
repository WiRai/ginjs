const fs = require('fs-extra');
const path = require('path');

function getFeatureList(): Array<string> {
  if (!process.env.PRODUCT_DIR) {
    throw new Error('No Product selected');
  }
  const featureList = fs.readJSONSync(path.join(process.env.PRODUCT_DIR, 'features.json'));
  return featureList;
}

function getFeatures(): Array<Object> {
  const features = [];
  const featureList = getFeatureList();
  featureList.forEach((elem: string) => {
    features.push(require(elem));
  });
  return features;
}

module.exports = {
  getFeatures,
  getFeatureList,
};
