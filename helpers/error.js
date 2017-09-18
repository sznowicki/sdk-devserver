/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const logger = require('./logger');

/**
 * Logs an error to the console.
 * @param {Object|string} err The error.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next Pass over to the next middleware.
 */
exports.logErrors = (err, req, res, next) => {
  if (!err) {
    next();
  }

  logger.error(err.stack);
  next(err);
};

/**
 * Returns and error statement inside an XHR request.
 * @param {Object|string} err The error.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next Pass over to the next middleware.
 */
exports.xhrErrorHandler = (err, req, res, next) => {
  if (!err) {
    next();
  }

  if (req.xhr) {
    res.status(500).send({
      status: 500,
      message: 'Something failed!',
      error: err.stack,
    });
  } else {
    next(err);
  }
};

/**
 * Renders the error view.
 * @param {Object|string} err The error.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next Pass over to the next middleware.
 */
exports.errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(500);
  res.render('error', { error: err });
};
