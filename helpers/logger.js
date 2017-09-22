/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const chalk = require('chalk');
const moment = require('moment');
const ip = require('ip');
const {
  ENV,
  silent,
} = require('./environment');

/**
 * Logger.
 */
class Logger {
  /**
   * The constructor.
   */
  constructor() {
    this.divider = '---------------------------------------------------------------------------\n';
    this.env = ENV;
    this.prefixShopgateCloud = `${chalk.green('Shopgate')}${chalk.blue('Cloud')}`;
    this.prefixServer = chalk.gray.bold('SERVER');
    this.prefixIndex = chalk.yellow.bold('app');
    this.prefixDocs = chalk.magenta.bold('docs');
  }

  /**
   * Checks if logger can output.
   * @return {boolean}
   */
  canOutput() {
    return this.isDev() && !silent;
  }
  /**
   * Checks if in development mode.
   * @returns {boolean}
   */
  isDev() {
    return (this.env !== 'production');
  }

  /**
   * Returns the logging divider.
   * @returns {string} The logging divider.
   */
  getDivider() {
    return this.divider;
  }

  /**
   * Returns the ShopgateCloud prefix.
   * @returns {string} The ShopgateCloud prefix.
   */
  getShopgateCloudPrefix() {
    return this.prefixShopgateCloud;
  }

  /**
   * Returns the server prefix.
   * @returns {string} The server prefix.
   */
  getPrefixServer() {
    return this.prefixServer;
  }

  /**
   * Returns the index prefix.
   * @returns {string} The index prefix.
   */
  getPrefixIndex() {
    return this.prefixIndex;
  }

  /**
   * Returns the docs prefix.
   * @returns {string} The docs prefix.
   */
  getPrefixDocs() {
    return this.prefixDocs;
  }

  /**
   * Logs an error to the console.
   * @param {*} err The error to log.
   */
  error(err) {
    if (!this.canOutput()) {
      return;
    }

    console.error(chalk.red.bold(err));
  }

  /**
   * Logs a info to the console.
   * @param {*} msg The message to log.
   */
  info(msg) {
    if (!this.canOutput()) {
      return;
    }

    console.log(chalk.cyan(msg));
  }

  /**
   * Logs a warning to the console.
   * @param {*} msg The message to log.
   */
  warn(msg) {
    if (!this.canOutput()) {
      return;
    }

    console.log(chalk.yellow.bold(msg));
  }

  /**
   * Logs a default log to the console.
   * @param {*} msg The message to log.
   */
  log(msg) {
    if (!this.canOutput()) {
      return;
    }

    console.log(msg);
  }

  /**
   * Logs a specialised message regarding start of the express server to the console.
   * @param {number} port The port for the dev server.
   */
  appStarted(port) {
    const serverStartup = moment().format('DD.MM.YYYY HH:mm:ss');
    const localUrl = chalk.cyan(`http://localhost:${port}`);
    const lanUrl = chalk.cyan(`http://${ip.address()}:${port}`);
    const exitKey = chalk.cyan.bold('CTRL-C');

    this.log(`Started at ${serverStartup}\n`);
    this.log(`Localhost: ${localUrl}`);
    this.log(`LAN:       ${lanUrl}`);
    this.log(`\nPress ${exitKey} to stop the server!`);
    this.log(`\n${this.getDivider()}`);
  }

  /**
   * Logs the setup underline.
   */
  setupLogo() {
    this.logo();
    this.log(chalk.white('\nP R O J E C T   S E T U P\n'));
  }

  /**
   * Logs the Shopgate Cloud logo.
   */
  logo() {
    this.log('');
    this.log(this.getDivider());
    this.log(`${chalk.green('S H O P G A T E')}   ${chalk.blue('C L O U D')}`);
    this.log('D E V E L O P M E N T   S E R V E R\n');
    this.log(this.getDivider());
  }
}

module.exports = new Logger();
