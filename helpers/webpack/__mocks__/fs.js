/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = jest.genMockFromModule('fs');
const { babelConfigLocal, babelConfigRemote } = require('./fs-objects');

fs.readFileSync = jest.fn()
  .mockImplementationOnce(() => { throw new Error(); })
  .mockImplementationOnce(() => { throw new Error(); })
  .mockImplementationOnce(() => { throw new Error(); })
  .mockImplementationOnce(() => JSON.stringify(babelConfigLocal))
  .mockImplementationOnce(() => JSON.stringify(babelConfigRemote));

module.exports = fs;
