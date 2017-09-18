/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const fs = require('fs');
const requireUncached = require('require-uncached');
const logger = require('../../../helpers/logger');

const prefix = logger.getSGXSServer();

/**
 * The pipelineRequest command.
 * @param {Object} parameter the command parameters.
 * @param {Function} callback The API callback.
 */
module.exports = (parameter, callback) => {
  let error = null;

  logger.log(`${prefix}: pipelineRequest: ${parameter.name}`);

  const answerCommand = {
    c: 'pipelineResponse',
    p: {
      serial: parameter.serial,
      error: null,
      output: null,
    },
  };

  const pipelineFileName = parameter.name.replace('_v1', '.js');
  const pipelineFilePath = path.resolve(process.cwd(), `server/mockData/${pipelineFileName}`);

  if (fs.existsSync(pipelineFilePath)) {
    const fn = requireUncached(pipelineFilePath);

    fn({}, parameter.input, (err, data) => {
      answerCommand.p.output = data;
      callback(null, answerCommand);
    });
  } else {
    error = new Error(`Pipeline ${parameter.name} is not implemented`);
    error.code = 'EPIPENOTFOUND';

    answerCommand.p.error = {
      message: error.message,
      code: error.code || 'EUNKNOWN',
    };

    callback(null, answerCommand);
  }
};
