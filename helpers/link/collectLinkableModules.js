/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { existsSync } = require('fs');
const { documentRoot } = require('../app').getDevConfig();

/**
 * Collects all linkable modules from the project's package.json file.
 * @param {Array} [collections=[]] An array of all dependency collections that should be used.
 * @return {Object}
 */
const collectLinkableModules = (collections = []) => {
  const linkableModules = {};

  if (collections.length === 0) {
    return linkableModules;
  }

  collections.forEach((dependencies) => {
    // Collect all linkable modules from dependencies.
    Object.keys(dependencies).forEach((packageName) => {
      if (packageName.indexOf('@shopgate') !== -1) {
        const folder = `${documentRoot}/${packageName.replace('@shopgate/', '')}`;

        if (!existsSync(folder)) {
          return;
        }

        linkableModules[packageName] = folder;
      }
    });
  });

  return linkableModules;
};

module.exports = collectLinkableModules;
