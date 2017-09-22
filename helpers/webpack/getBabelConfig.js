/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { readFileSync } = require('fs');
const { resolve } = require('path');
const { projectPath } = require('../environment');

/**
 * Returns a babel configuration. Checks if there is a .babelrc in the remote directory
 * of the current project and returns this. Otherwise it uses the pre-defined .babelrc
 * from this repository.
 * @return {Object} A babel configuration.
 */
module.exports = function getBabelConfig() {
  try {
    const projectBabel = readFileSync(`${projectPath}/.babelrc`);
    return JSON.parse(projectBabel);
  } catch (e) {
    try {
      const serverBabel = readFileSync(resolve(__dirname, '../.babelrc'));
      return JSON.parse(serverBabel);
    } catch (e2) {
      return {};
    }
  }
};
