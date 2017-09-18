/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { resolve } = require('path');
const chalk = require('chalk');
const { writeFile } = require('fs');
const logger = require('../helpers/logger');
const { projectPath } = require('../helpers/environment');
const { USER_TIMEOUT } = require('./constants');

const configFile = resolve(projectPath, 'config', 'local.json');
const prefix = logger.getShopgateCloudPrefix();

/**
 * Writes the config file into the remote project.
 * @param {Object} answers All the answers.
 */
const writeConfigFile = (answers) => {
  const result = answers;
  result.type = 'app'; // Always use 'app' as long as there is no real web stuff

  const output = `${JSON.stringify(result, null, 2)}\n`;

  logger.log('\nThank you!');
  setTimeout(() => {
    logger.log('\nWriting your configuration ...');

    writeFile(configFile, output, 'utf8', (err) => {
      setTimeout(() => {
        if (err) {
          logger.error(`${prefix}: An error occured:`);
          logger.error(err);
        } else {
          logger.log(`\n${chalk.green('✓')} ... all done!\n`);
          logger.log(`Your ${prefix} project is now ready!\n`);

          if (result.sgcloudSetup) {
            logger.log(`${chalk.white('ATTENTION')}: It may take a few minutes to connect your IP with the ${prefix}!\n`);
          }
        }

        logger.log('\n\n');
      }, USER_TIMEOUT);
    });
  }, USER_TIMEOUT);
};

module.exports = writeConfigFile;
