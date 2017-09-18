/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { getBabelConfig } = require('./index');
const { babelConfig } = require('./mock');

describe('Helpers: webpack', () => {
  describe('getBabelConfig()', () => {
    it('should return the babel config', () => {
      const config = getBabelConfig();

      expect(config).toEqual(babelConfig);
    });
  });
});
