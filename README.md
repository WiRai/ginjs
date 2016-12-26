# ginjs
[![npm package](https://img.shields.io/npm/v/ginjs.svg?style=flat-square)](https://www.npmjs.org/package/ginjs)
[![Build Status](https://travis-ci.org/WiRai/ginjs.svg?branch=master)](https://travis-ci.org/WiRai/ginjs)
[![codecov](https://codecov.io/gh/WiRai/ginjs/branch/master/graph/badge.svg)](https://codecov.io/gh/WiRai/ginjs)
[![Code Climate](https://codeclimate.com/github/WiRai/ginjs/badges/gpa.svg)](https://codeclimate.com/github/WiRai/ginjs)
[![Dependency Status](https://david-dm.org/wirai/ginjs.svg)](https://david-dm.org/wirai/ginjs)
[![devDependency Status](https://david-dm.org/wirai/ginjs/dev-status.svg)](https://david-dm.org/wirai/ginjs?type=dev)

A tool for building feature-oriented productlines with Node.js.

Todo: Add documentation and info about related projects.
Important: Better testcoverage...

To start build a productline:

```sh
mkdir myProductlineDir
cd myProductlineDir
npm init
npm install --save ginjs
node_modules/.bin/gin createProductLine .
```

You should now have a first productline in myProductlineDir.
To activate your first product cd to products/default and source the activate script through

```sh
. activate
```

Now you have the gin command in the context of the selected product in your path.

Just try:
```sh
gin help
```

You find a dummy feature called gap in the features folder, feature selection is done through features.json in a products folder, e.g. products/default.

More information will follow...
