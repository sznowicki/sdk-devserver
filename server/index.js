/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const morgan = require('morgan');
const compression = require('compression');
const { series } = require('async');
const { resolve } = require('path');
const { json, urlencoded } = require('body-parser');
const logger = require('../helpers/logger');
const { setContentTypeHeaders, setCrossOriginHeaders, getDevConfig } = require('../helpers/app');
const { isDev, isStaging, isProd, projectPath, silent } = require('../helpers/environment');
const { logErrors, xhrErrorHandler, errorHandler } = require('../helpers/error');
const setupExtensions = require('../extensions/setup');
const extensionIndexWatcher = require('../extensions');
const hot = require('./hot');

const config = getDevConfig();

// Show the SDK logo on startup.
logger.logo();

// Create the app.
const app = express();

// Setup the app basics.
app.set('x-powered-by', false);
app.set('view engine', 'pug');

// Apply middlewares.
app.use(setContentTypeHeaders);
app.use(setCrossOriginHeaders);
app.use(logErrors);
app.use(xhrErrorHandler);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(compression());
if (!silent) {
  app.use(morgan('dev'));
}
if (isStaging || isProd) {
  // Add static files rule on production and staging.
  app.use('/static', expressStaticGzip(resolve(projectPath, 'public')));
}

series([
  (callback) => {
    // Start the server.
    app.listen(config.port);
    logger.appStarted(config.port);
    callback();
  },
  (callback) => {
    if (!isDev) {
      callback();
      return;
    }

    setupExtensions(callback);
  },
  (callback) => {
    if (!isDev) {
      callback();
      return;
    }

    extensionIndexWatcher(callback);
  },
  (callback) => {
    // Apply the router into the app.
    app.use(require('./router')); // eslint-disable-line global-require
    callback();
  },
  (callback) => {
    if (!isDev) {
      callback();
      return;
    }

    setTimeout(() => {
      hot(app, config);
      callback();
    }, 1500);
  },
  () => {
    // Set error handler.
    app.use(errorHandler);
  },
]);
