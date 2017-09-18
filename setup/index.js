/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { resolve } = require('path');
const { access } = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const logger = require('../helpers/logger');
const { projectPath } = require('../helpers/environment');
const runProjectSetup = require('./runProjectSetup');

const prefix = logger.getShopgateCloudPrefix();
const configFile = resolve(projectPath, 'config', 'local.json');

const fileExistsQuestion = [
  {
    type: 'confirm',
    name: 'overwrite',
    message: `${chalk.red('A config already exists!')}\nDo you want to overwrite it?`,
    default: true,
  },
];

logger.setupLogo();

access(configFile, (err) => {
  if (!err) {
    inquirer
      .prompt(fileExistsQuestion)
      .then((answer) => {
        if (!answer.overwrite) {
          logger.log(`\n${prefix}: Setup canceled!\n\n`);
          return;
        }

        logger.log('\n');
        runProjectSetup();
      });
  } else {
    runProjectSetup();
  }
});
