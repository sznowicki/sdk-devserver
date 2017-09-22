/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { existsSync } = require('fs');
const { resolve } = require('path');

/**
 * Copies package related files to the destination folder.
 * @param {Array} files The files names to copy.
 * @param {string} rootPath The root to look for files.
 * @param {string} [destinationPath='./dist'] The path copy the files based on the rootPath.
 * @return {string|null}
 */
module.exports = function copyFiles(files, rootPath, destinationPath = './dist') {
  if (files.length === 0) {
    return null;
  }

  const fileCollection = files.map((file) => {
    if (existsSync(resolve(rootPath, file))) {
      return file;
    }

    if (existsSync(resolve(rootPath, '..', file))) {
      return `../${file}`;
    }

    return '';
  });

  if (fileCollection.join(' ').trim().length > 0) {
    return `cp -rf ${fileCollection.join(' ')} ${destinationPath}`;
  }

  return null;
};
