/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const inquirer = require('inquirer');
const { resolve } = require('path');
const { existsSync } = require('fs');
const localIp = require('./helpers').getLocalIpAdresses();
const logger = require('../helpers/logger');
const { projectPath } = require('../helpers/environment');
const registerSettingsWithRapid = require('./registerSettingsWithRapid');
const writeConfigFile = require('./writeConfigFile');

const documentRoot = resolve(projectPath, '..');

const defaultConfig = {
  type: 'app',
  ip: localIp,
  port: 9666,
  startPagePath: '/',
  hmrPort: 3000,
};

const questions = [
  {
    type: 'input',
    name: 'ip',
    message: 'Which IP address should the app connect to?',
    default: defaultConfig.ip,
  },
  {
    type: 'input',
    name: 'port',
    message: 'On which port should the app run?',
    default: defaultConfig.port,
  },
  {
    type: 'input',
    name: 'hmrPort',
    message: 'On which port should the HMR (Hot Module Replacement) run?',
    default: defaultConfig.hmrPort,
  },
  {
    type: 'input',
    name: 'shopNumber',
    message: 'What is the number of your test shop?',
    validate: (input) => {
      if (isNaN(parseInt(input, 10))) {
        return 'Shop number needs to be a NUMBER!';
      }

      if (input.length !== 5) {
        return 'Shop number needs to have 5 digits!';
      }

      return true;
    },
  },
  {
    type: 'input',
    name: 'accessToken',
    message: 'For gathering the startpage, please provide us your RAPID access token.',
  },
  {
    type: 'confirm',
    name: 'sgcloudSetup',
    message: 'Do you want to register your IP with the ShopgateCloud?',
    default: true,
  },
  {
    type: 'input',
    name: 'documentRoot',
    message: 'What is your document root folder?',
    default: documentRoot,
    validate: (input) => {
      if (existsSync(input)) {
        return true;
      }

      return 'This is not a valid directory on your local machine!';
    },
  },
  {
    type: 'confirm',
    name: 'confirmed',
    message: 'Are these settings correct?',
    default: true,
  },
];

/**
 * Runs the setup process.
 */
const runSetup = () => {
  inquirer
    .prompt(questions)
    .then(answers => registerSettingsWithRapid(answers, defaultConfig))
    .then(writeConfigFile)
    .catch(err => err && logger.error(err));
};

module.exports = runSetup;
