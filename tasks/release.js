/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { resolve } = require('path');
const { readFileSync } = require('fs');
const { bold, green } = require('chalk');
const prompt = require('readline-sync').question;
const logger = require('../helpers/logger');
const { projectPath, isSimpleRelease } = require('../helpers/environment');
const exec = require('../helpers/exec');

const prefix = logger.getShopgateCloudPrefix();
const serverModules = resolve(__dirname, '..', 'node_modules');
const pkg = JSON.parse(readFileSync(resolve(projectPath, 'package.json')));
const packageVersion = pkg.version;

logger.log('\n');
logger.log(`${prefix} ${bold('Performing release process!')}`);
logger.log('\n');

// Request a new version.
const versionInput = prompt(`Next version (current version is ${packageVersion})? `);

// Validate the new version.
const validVersion = /^([0-9].[0-9].[0-9])+$|^([0-9].[0-9].[0-9])(.*(-))(.*(alpha)|(beta))([0-9])+$/.test(versionInput);
if (!validVersion) {
  logger.error('\nSORRY! The version number was not valid. Please try again.\n');
  process.exit(1);
}

// Is it a new version??
if (versionInput === packageVersion) {
  logger.error(`\nERROR: The version '${versionInput}' already exists. Please try again.\n`);
  process.exit(1);
}

// Change the package version.
logger.log(bold('Changing package version ...'));
exec(`npm version ${versionInput}`, projectPath);

if (!isSimpleRelease) {
  // Clean up the previous release.
  logger.log(bold('Cleaning up ...'));
  exec(`${serverModules}/.bin/rimraf ./dist`, projectPath);

  // Transpile the scripts.
  logger.log(bold('Processing files ...\n'));
  exec(`${serverModules}/.bin/babel ./ --out-dir ./dist --no-comments --ignore spec.js,spec.jsx,__snapshots__,.eslintrc.js,dist,coverage,node_modules`, projectPath);

  // Copy the package files.
  logger.log(bold('\nCopy packages ...'));
  exec('cp -rf package.json package-lock.json CHANGELOG.md LICENSE.md README.md ./dist', projectPath);
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
