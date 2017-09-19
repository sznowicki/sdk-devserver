/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { existsSync } = require('fs');
const { resolve } = require('path');
const exec = require('./exec');

/**
 * Copies package related files to the destination folder.
 * @param {Array} files The files names to copy.
 * @param {string} rootPath The root to look for files.
 * @param {string} [destinationPath='./dist'] The path copy the files based on the rootPath.
 */
exports.copyFiles = (files, rootPath, destinationPath = './dist') => {
  if (files.length === 0) {
    return;
  }

  const copyFiles = files.map((file) => {
    if (existsSync(resolve(rootPath, file))) {
      return file;
    }

    if (existsSync(resolve(rootPath, '..', file))) {
      return `../${file}`;
    }

    return '';
  });

  if (copyFiles.length > 0) {
    exec(`cp -rf ${copyFiles.join(' ')} ${destinationPath}`, rootPath);
  }
};
