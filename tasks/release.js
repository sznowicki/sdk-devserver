/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { resolve } = require('path');
const { bold, green } = require('chalk');
const logger = require('../helpers/logger');
const { projectPath, isSimpleRelease } = require('../helpers/environment');
const exec = require('../helpers/exec');
const { copyFiles, bumpVersion } = require('../helpers/release');
const pkg = require('../helpers/app').getPackageSettings();

const prefix = logger.getShopgateCloudPrefix();
const serverModules = resolve(__dirname, '..', 'node_modules');

logger.log('\n');
logger.log(`${prefix} ${bold('Performing release process!')}`);
logger.log('\n');

const [bumpVersionCommand, versionInput] = bumpVersion();

if (bumpVersionCommand) {
  // Change the package version.
  logger.log(bold('Changing package version ...'));
  exec(bumpVersionCommand, projectPath);
}

if (!isSimpleRelease) {
  // Clean up the previous release.
  logger.log(bold('Cleaning up ...'));
  exec(`${serverModules}/.bin/rimraf ./dist`, projectPath);

  // Transpile the scripts.
  logger.log(bold('Processing files ...\n'));
  exec(`${serverModules}/.bin/babel ./ --out-dir ./dist --no-comments --ignore spec.js,spec.jsx,__snapshots__,.eslintrc.js,dist,coverage,node_modules`, projectPath);

  // Copy the package files.
  const copyCommand = copyFiles([
    '.npmignore',
    'package.json',
    'package-lock.json',
    'npm-shrinkwrap.json',
    'CHANGELOG.md',
    'LICENSE.md',
    'README.md',
  ], projectPath);

  if (copyCommand) {
    logger.log(bold('\nCopy packages ...'));
    exec(copyCommand, projectPath);
  }
}

const folderCommand = !isSimpleRelease ? 'cd ./dist && ' : '';

// Publish.
if (versionInput.indexOf('beta') !== -1) {
  // Publish a beta version.
  const betaV = versionInput.split('beta')[1];
  exec(`${folderCommand}npm publish --tag beta${betaV} --access public && cd ..`, projectPath);
} else if (versionInput.indexOf('alpha') !== -1) {
  // Publish a alpha version.
  const alphaV = versionInput.split('alpha')[1];
  exec(`${folderCommand}npm publish --tag alpha${alphaV} --access public && cd ..`, projectPath);
} else {
  // Publis a major release.
  exec(`${folderCommand}npm publish --access public && cd ..`, projectPath);
}

if (!isSimpleRelease) {
  // Removing dist folder again
  logger.log(bold('Final cleanup ...'));
  exec(`${serverModules}/.bin/rimraf ./dist`, projectPath);
}

logger.log(`\n${green('SUCCESS')}: The release process is finished.`);
logger.log(`Your package is released: ${pkg.name}@${versionInput}\n\n`);
