/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const getExtensionIndex = require('./getExtensionIndex');
const logger = require('../helpers/logger');

/**
 * Generates the extensions index.js file.
 * @param {string|null} err An error message or null.
 * @param {Object} config The module configuration.
 */
const generateIndex = (err, config) => {
  if (err) {
    logger.error(err);
    return;
  }

  getExtensionIndex(config);
};

module.exports = generateIndex;
