/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { resolve } = require('path');
const chalk = require('chalk');
const exec = require('../helpers/exec');
const { ENV_KEY_PRODUCTION } = require('../constants');

const logger = console;
const projectPath = process.cwd();
const workingDirectory = resolve(__dirname, '..');
const serverModules = resolve(workingDirectory, 'node_modules');
const nodeEnvSetup = `NODE_ENV=${ENV_KEY_PRODUCTION} PROJECT_PATH="${projectPath}"`;

// Cleaning up.
logger.log(`\n${chalk.blue('STATUS')}: Cleaning up ...`);
exec(`${serverModules}/.bin/rimraf ./public`, projectPath);
// Index the extensions.
logger.log(`\n${chalk.blue('STATUS')}: Indexing extensions ...\n`);
exec(`${nodeEnvSetup} node ./extensions/index.js`, workingDirectory);
// Run production build
logger.log(`\n${chalk.blue('STATUS')}: Webpack is running, please wait ...`);
exec(`${nodeEnvSetup} npm run production`, workingDirectory);

logger.log(`${chalk.green('SUCCESS')}: Webpack is finished.`);
logger.log('Please enjoy your app!\n\n');
