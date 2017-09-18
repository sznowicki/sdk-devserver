/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { resolve } = require('path');
const chokidar = require('chokidar');
const debounce = require('lodash/debounce');
const conshelper = require('../helpers/logger');
const generateIndex = require('./generateIndex');
const { projectPath } = require('../helpers/environment');

const EXTENSIONS = 'extensions';
const prefix = conshelper.getShopgateCloudPrefix();
const logger = console;
const logPath = `./${EXTENSIONS}`;

// The main module configuration.
const config = {
  path: resolve(projectPath, EXTENSIONS),
  configFile: 'extension-config.json',
  cli: (require.main === module),
  callback: () => {
    if (require.main !== module) {
      logger.log(`\n${prefix} Finished ${EXTENSIONS} index generation.\n`);
    }
  },
};

/**
 * Creates a watcher on all files in the extensions base
 * folder that creates a index.js on file change.
 * @param {Function} [callback] A callback function that will be triggered at the end.
 */
const extensionIndexWatcher = (callback = () => {}) => {
  logger.log(`${prefix} Watching folder '${logPath}' for indexes ...\n`);

  let initial = true;

  // Add a recursive file watcher to the given directory.
  chokidar
    // Ignores all .dotfiles.
    .watch(config.path, {
      awaitWriteFinish: true,
      ignored: [
        '**/index.js',
        '**/node_modules/**',
        '.*',
        '*.snap.*',
        '!*.js*',
        '*.log',
      ],
    })
    .on('all', debounce(() => {
      if (!initial) {
        generateIndex(null, config);
      }
    }, 1000))
    .on('ready', () => {
      setTimeout(() => {
        initial = false;
        generateIndex(null, config);
        callback();
      }, 3000);
    });
};

module.exports = extensionIndexWatcher;

// Only execute this block if the script has been called directly through CLI.
if (require.main === module) {
  logger.log(`${prefix} Writing ${logPath}/index.js ...\n`);

  generateIndex(null, config);
}
