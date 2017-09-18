/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const ip = require('ip');
const { resolve } = require('path');
const requireUncached = require('require-uncached');
const { projectPath } = require('./environment');

/**
 * Reset the headers content type to force utf-8.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next Callback to delegate to the next middleware.
 */
exports.setContentTypeHeaders = (req, res, next) => {
  if (req.headers['content-type']) {
    req.headers['content-type'] = req.headers['content-type'].replace('utf8', 'utf-8');
  }

  next();
};

/**
 * Sets the cross origin headers to allow all origins.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next Callback to delegate to the next middleware.
 */
exports.setCrossOriginHeaders = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};

/**
 * Returns the app settings from the remote project.
 * @return {Object} The app settings.
 */
exports.getAppSettings = () => {
  try {
    return requireUncached(`${projectPath}/config/app.json`);
  } catch (e) {
    return {};
  }
};

/**
 * Returns the package json fole from the remote project.
 * @return {Object} package json contents.
 */
exports.getPackageSettings = () => {
  try {
    return requireUncached(`${projectPath}/package.json`);
  } catch (e) {
    return {};
  }
};

/**
 * Returns the development configuration.
 * @return {Object} The development configuration.
 */
exports.getDevConfig = () => {
  const defaultConfig = {
    ip: ip.address(),
    port: 9666,
    startPagePath: '/',
    hmrPort: 3000,
    shopNumber: '00000',
    sgxsSetup: false,
    documentRoot: resolve(projectPath, '..'),
    type: 'app',
  };

  try {
    const remoteConfig = requireUncached(`${projectPath}/config/local.json`);
    return Object.assign({}, defaultConfig, remoteConfig);
  } catch (e) {
    return defaultConfig;
  }
};
