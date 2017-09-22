/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { existsSync } = require('fs');
const { resolve } = require('path');
const prompt = require('readline-sync').question;
const logger = require('../logger');
const pkg = require('../app').getPackageSettings();

/**
 * Copies package related files to the destination folder.
 * @param {Array} files The files names to copy.
 * @param {string} rootPath The root to look for files.
 * @param {string} [destinationPath='./dist'] The path copy the files based on the rootPath.
 * @return {string|null}
 */
exports.copyFiles = (files, rootPath, destinationPath = './dist') => {
  if (files.length === 0) {
    return null;
  }

  const copyFiles = files.map((file) => {
    if (existsSync(resolve(rootPath, file))) {
      return file;
    }

    if (existsSync(resolve(rootPath, '..', file))) {
      return `../${file}`;
    }

    return '';
  });

  if (copyFiles.join(' ').trim().length > 0) {
    return `cp -rf ${copyFiles.join(' ')} ${destinationPath}`;
  }

  return null;
};

/**
 * Creates the bump version command for the release process.
 * @return {Array|null}
 */
exports.bumpVersion = () => {
  // Request a new version.
  const versionInput = prompt(`Next version (current version is ${pkg.version})? `);

  // Validate the new version.
  const validVersion = /^([0-9].[0-9].[0-9])+$|^([0-9].[0-9].[0-9])(.*(-))(.*(alpha)|(beta))([0-9])+$/.test(versionInput);
  if (!validVersion) {
    logger.error('\nSORRY! The version number was not valid. Please try again.\n');
    return null;
  }

  // Is it a new version??
  if (versionInput === pkg.version) {
    logger.error(`\nERROR: The version '${versionInput}' already exists. Please try again.\n`);
    return null;
  }

  return [`npm version ${versionInput}`, versionInput];
};
