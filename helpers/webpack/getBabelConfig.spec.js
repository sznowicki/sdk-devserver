/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const getBabelConfig = require('./getBabelConfig');
const { isObject } = require('../validation');
const { babelConfigLocal, babelConfigRemote } = require('./__mocks__/fs-objects');

jest.mock('fs');

describe('Helpers: webpack', () => {
  describe('getBabelConfig()', () => {
    it('should return an empty object if no config could be fetched.', () => {
      const config = getBabelConfig();

      expect(isObject(config)).toBe(true);
      expect(Object.keys(config).length).toBe(0);
    });

    it('should return the local babel config if remote can not be found', () => {
      const config = getBabelConfig();

      expect(config).toEqual(babelConfigLocal);
    });

    it('should return the remote babel config', () => {
      const config = getBabelConfig();

      expect(config).toEqual(babelConfigRemote);
    });
  });
});
