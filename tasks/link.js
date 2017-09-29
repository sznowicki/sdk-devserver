/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { green, red, bold } = require('chalk');
const exec = require('../helpers/exec');
const logger = require('../helpers/logger');
const { projectPath } = require('../helpers/environment');
const { dependencies, devDependencies } = require('../helpers/app').getPackageSettings();
const collectLinkableModules = require('../helpers/link/collectLinkableModules');

const prefix = logger.getShopgateCloudPrefix();
const linkableModules = collectLinkableModules([dependencies, devDependencies]);

logger.log(`\n${prefix} Linking modules ...\n`);

const moduleKeys = Object.keys(linkableModules);

if (moduleKeys.length === 0) {
  // If there are no linkable modules, end this routine.
  logger.log(`${red('✗')} ${bold('Nothing to link')}.\n`);
  logger.log(' Make sure to check out the shopgate modules you may want to work on!\n');
  logger.log(`${prefix} Process ended.\n`);
} else {
  logger.log(` ${bold(moduleKeys.length)} linkable modules found. Please wait ... \n`);

  moduleKeys.forEach((key) => {
    const folder = linkableModules[key];

    exec(`cd ${folder} && npm link`);
    exec(`cd ${projectPath} && npm link ${key}`);

    logger.log(`\n ${green('✓')} ${bold(`Linked module '${key}'`)}\n`);
  });

  logger.log(`${prefix} All modules linked.\n`);
}
