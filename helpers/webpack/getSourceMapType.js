/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {
  isDev,
  sourcemap,
} = require('../environment');

/**
 * Gets the source map mode which should be used within
 * the webpack config.
 * @return {string}
 */
module.exports = () => {
  if (sourcemap) {
    return sourcemap;
  }

  if (isDev) {
    return 'cheap-module-eval-source-map';
  }

  return 'cheap-module-source-map';
};
