/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const requireUncached = require('require-uncached');
const glob = require('glob');

/**
 * Returns a list of all the extension configuration files.
 * @param {Object} config The module configuration.
 * @return {Array} The list of configuration files.
 */
const getConfigFiles = config => glob
  .sync(`${config.path}/**/${config.configFile}`)
  .reduce((arr, f) => arr.concat([f]), []);

/**
 * Get all the configs from the extensions.
 * @param {Object} config The module configuration.
 * @return {Object} All the extensions configs by extension ID.
 */
const getConfigs = (config) => {
  const configFiles = getConfigFiles(config);
  const configs = {};

  configFiles.forEach((file) => {
    const extConfig = requireUncached(file);

    if (extConfig.id && extConfig.components) {
      configs[extConfig.id] = extConfig.components;
    }
  });

  return configs;
};

module.exports = getConfigs;
