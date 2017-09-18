/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { existsSync } = require('fs');
const { green, red, bold } = require('chalk');
const exec = require('../helpers/exec');
const logger = require('../helpers/logger');
const { projectPath } = require('../helpers/environment');
const { documentRoot } = require('../helpers/app').getDevConfig();
const { dependencies } = require('../helpers/app').getPackageSettings();

const prefix = logger.getShopgateCloudPrefix();

const linkableModules = {};

logger.log(`\n${prefix} Linking modules ...\n`);

// Collect all linkable modules.
Object.keys(dependencies).forEach((packageName) => {
  if (packageName.indexOf('@shopgate') !== -1) {
    const folder = `${documentRoot}/${packageName.replace('@shopgate/', '')}`;

    if (!existsSync(folder)) {
      return;
    }

    linkableModules[packageName] = folder;
  }
});

const moduleKeys = Object.keys(linkableModules);

if (moduleKeys.length === 0) {
  // If there are no linkable modules, end this routine.
  logger.log(`${red('✗')} ${bold('Nothing to link')}.\n`);
  logger.log(' Make sure to checkout the shopgate modules you may want to work on!\n');
  logger.log(`${prefix} Process ended.\n`);
  process.exit(0);
}

logger.log(` ${bold(moduleKeys.length)} linkable modules found. Please wait ... \n`);

moduleKeys.forEach((key) => {
  const folder = linkableModules[key];

  exec(`cd ${folder} && npm link`);
  exec(`cd ${projectPath} && npm link ${key}`);

  logger.log(`\n ${green('✓')} ${bold(`Linked module '${key}'`)}\n`);
});

logger.log(`${prefix} All modules linked.\n`);
