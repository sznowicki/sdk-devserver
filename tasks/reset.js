/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const chalk = require('chalk');
const exec = require('../helpers/exec');

const logger = console;

logger.log('\n');
logger.log(`${chalk.blue('STATUS')}: Resetting your project, please wait ...\n`);

exec('rm -rf node_modules/ && rm -f npm-shrinkwrap.json && npm i', process.cwd());

logger.log(`${chalk.green('SUCCESS')}: Reset is finished.`);
logger.log('Please enjoy your coding experience!\n\n');
