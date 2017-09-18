/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const logger = require('../helpers/logger');
const { USER_TIMEOUT } = require('./constants');
const runSetup = require('./runSetup');

const prefix = logger.getShopgateCloudPrefix();

/**
 * Starts the project setup.
 */
const runProjectSetup = () => {
  logger.log(`Welcome! Your ${prefix} project will now be set up!`);
  logger.log('Please follow these instructions:\n');

  setTimeout(() => {
    logger.log('Ready? ... Let\'s start! \n');
    setTimeout(runSetup, USER_TIMEOUT);
  }, USER_TIMEOUT);
};

module.exports = runProjectSetup;
