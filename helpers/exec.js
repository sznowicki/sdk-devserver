/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const execSync = require('child_process').execSync;
const { resolve } = require('path');

/**
 * Execute a command sycronously.
 * @param {string} command The command to execute.
 * @param {string} [cwd] The current working directory.
 * @param {Object} [extraEnv] Some extra env variables.
 * @return {Buffer|string} The stdout from the command.
 */
module.exports = (command, cwd = resolve(__dirname, '..'), extraEnv = {}) =>
  execSync(command, {
    cwd,
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });
