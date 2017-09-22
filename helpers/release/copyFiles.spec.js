/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const copyFiles = require('./copyFiles');

describe('Helpers: release > copyFiles()', () => {
  it('should return null if no files found.', () => {
    const command = copyFiles(['somefile.js'], __dirname);

    expect(command).toBe(null);
  });

  it('should return null if no files are passed', () => {
    const command = copyFiles([], __dirname);

    expect(command).toBe(null);
  });

  it('should return a command if files are found', () => {
    const command = copyFiles(['mock.js'], __dirname);

    expect(command).toBe('cp -rf mock.js ./dist');
  });

  it('should return a command if file is in parent folder', () => {
    const command = copyFiles(['.gitkeep'], __dirname);

    expect(command).toBe('cp -rf ../.gitkeep ./dist');
  });
});
