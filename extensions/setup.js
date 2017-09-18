/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { existsSync } = require('fs');
const { resolve, join } = require('path');
const { exec } = require('child_process');
const conshelpers = require('../helpers/logger');
const { isTest, projectPath } = require('../helpers/environment');

const prefix = conshelpers.getShopgateCloudPrefix();
const logger = console;

const extensions = {
  'commerce-widgets': 'git@github.com:shopgate/commerce-widgets.git',
  // 'core-tracking': 'ssh://git@stash.localdev.cc:7999/fe/tracking.git',
  // 'shopgate-tracking-ga-native': 'ssh://git@stash.localdev.cc:7999/sgx/shopgate-tracking-ga-native.git',
};
const extensionsPath = resolve(projectPath, 'extensions');

/**
 * Runs the tests of a extension.
 * @param {string} dir The path to the extension.
 * @param {string} name The extension name.
 * @param {Function} callback When the process is finished.
 */
const runTest = (dir, name, callback) => {
  if (isTest && existsSync(join(dir, 'package.json'))) {
    logger.log(`${prefix} Running tests for extension '${name}'. Please wait ...`);

    exec('npm test', {
      cwd: dir,
    }, (error, stdout) => {
      if (error) {
        logger.log(stdout);
        logger.error(error);
        callback();
        return;
      }

      logger.log(`${prefix} '${name}' test result:`);
      logger.log(stdout);
      callback();
    });
  } else {
    callback();
  }
};

/**
 * Checks out a extension repository.
 * @param {string} name The extension name
 * @param {string} repo The repository URL.
 * @param {Function} callback When the process is finished.
 */
const checkOut = (name, repo, callback) => {
  const dir = join(extensionsPath, name);

  if (existsSync(dir)) {
    logger.log(`${prefix} Updating extension '${name}'. Please wait ...`);

    exec('git pull', {
      cwd: dir,
    }, (error, stdout) => {
      if (error) {
        logger.log(stdout);
        logger.error(error);
        callback();
        return;
      }

      logger.log(`${prefix} Extension '${name}' is up to date.`);
      runTest(dir, name, callback);
    });

    return;
  }

  logger.log(`${prefix} Checking out extension '${name}'`);

  exec(`git clone ${repo} ${dir}`, {
    encoding: 'utf8',
  }, (error, stdout) => {
    if (error) {
      logger.log(stdout);
      logger.error(error);
      callback();
      return;
    }

    logger.log(`${prefix} Initializing extension '${name}'. Please wait ...`);

    exec('npm i', {
      cwd: dir,
    }, (error2, stdout2) => {
      if (error2) {
        logger.log(stdout2);
        logger.error(error2);
        callback();
        return;
      }

      logger.log(`${prefix} Extension '${name}' checked out to '${dir}'.`);
      runTest(dir, name, callback);
    });
  });
};

/**
 * Checks if the extension can be checked out and runs checkOut.
 * @param {string} name The extension name.
 * @param {Function} callback When the process is finished.
 */
const addExtension = (name, callback) => {
  if (!extensions[name]) {
    logger.error(`${prefix} Unknown extension '${name}'. Please check your configuration.`);
    process.exit(0);
  }

  checkOut(name, extensions[name], callback);
};

/**
 * Runs the extensions setup.
 * @param {Function} callback Is called at the end of the setup.
 */
const setup = (callback = () => {}) => {
  // Add a new extension from cli option.
  if (process.argv[2] && process.argv[2].indexOf('--') === -1) {
    addExtension(process.argv[2]);
    return;
  }

  let checkedOut = 0;

  // Add new extension by the provided list.
  Object.keys(extensions).forEach((extension) => {
    addExtension(extension, () => {
      checkedOut += 1;

      if (checkedOut === Object.keys(extensions).length) {
        logger.log('');
        callback();
      }
    });
  });
};

module.exports = setup;
