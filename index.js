/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { resolve } = require('path');
const { isLink, isProd, isSetup, isReset, isRelease } = require('./helpers/environment');

let modulePath = resolve(__dirname, './server');

if (isLink) {
  // Linking local shopgate packages.
  modulePath = resolve(__dirname, './tasks/link');
} else if (isProd) {
  // Performing production build
  modulePath = resolve(__dirname, './tasks/production');
} else if (isSetup) {
  // Setting up the remote project.
  modulePath = resolve(__dirname, './setup');
} else if (isReset) {
  // Resetting the remote project.
  modulePath = resolve(__dirname, './tasks/reset');
} else if (isRelease) {
  // Performs the release process for the current module.
  modulePath = resolve(__dirname, './tasks/release');
}

require(modulePath); // eslint-disable-line import/no-dynamic-require
