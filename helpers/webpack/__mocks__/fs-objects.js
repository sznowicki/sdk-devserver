/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

exports.babelConfigLocal = {
  presets: [
    'env',
  ],
  plugins: [
    'transform-object-rest-spread',
    'transform-class-properties',
    'transform-export-extensions',
  ],
};

exports.babelConfigRemote = {
  presets: [
    'env',
  ],
};
