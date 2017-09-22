/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const prompt = require('readline-sync').question;
const logger = require('../logger');
const pkg = require('../app').getPackageSettings();

/**
 * Creates the bump version command for the release process.
 * @return {Array|null}
 */
module.exports = function bumVersion() {
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
