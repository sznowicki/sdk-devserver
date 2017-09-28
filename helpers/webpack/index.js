/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { join } = require('path');
const requireUncached = require('require-uncached');
const { projectPath } = require('../environment');
const { extensions } = require('../app').getAppSettings();

/**
 * Returns a webpack config. Checks if there is a webpack config in the remote directory
 * of the current project and returns this. Otherwise it uses the pre-defined webpack
 * configuration from this repository.
 * @return {Object} A webpack configuration.
 */
exports.getRemoteWebpackConfig = () => {
  try {
    return requireUncached(`${projectPath}/webpack.config`);
  } catch (e) {
    return null;
  }
};

/**
 * Returns the node modules paths to all extensions.
 * @return {Array}
 */
exports.getExtensionsNodeModulesPaths = () => (
  extensions.map(name => join(projectPath, 'extensions', name, 'frontend', 'node_modules'))
);

/**
 * Converts a lowercase language key to ISO conform lower-uppercase.
 * @param {string} language The received language.
 * @return {string} The converted language.
 */
exports.convertLanguageToISO = (language) => {
  const elements = language.split('-');
  return `${elements[0]}-${elements[1].toUpperCase()}`;
};

/**
 * Adds a trailing slash to a URL if needed.
 * @param {string} url The input URL.
 * @returns {string} The normalized URL.
 */
exports.normalizeUrl = (url) => {
  if (url.slice(-1) === '/') {
    return url;
  }

  return `${url}/`;
};
