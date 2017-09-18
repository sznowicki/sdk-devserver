/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const request = require('request');
const logger = require('../../helpers/logger');

let settings = {};
const prefix = logger.getShopgateCloudPrefix();

/**
 * Set the settings necessary to send requests to the RAPID.
 * @param {Object} options Settings for requesting the RAPID
 * @param {string} options.url Endpoint of the RAPID that processes the http requests
 * @param {string} options.shopNumber Number of the shop for which the request should be made
 * @param {string} options.sessionId SessionId from cake (required e.g. for getting prices)
 * @param {string} options.deviceId Device identifier necessary for pipelines to access storages
 */
function setup(options) {
  logger.log(`${prefix} Setup options for connecting to the RAPID: \n`);
  logger.log(options);
  logger.log('\n');

  settings = options;
}

/**
 * Forwards the request to the new rapid
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
function handle(req, res) {
  req.body.vars = { sid: settings.sessionId };

  if (req.body.cmds[0].c === 'sendPipelineRequest') {
    req.body.cmds[0].c = 'pipelineRequest';
  }

  if (!req.body.ver) {
    req.body.ver = '9.0';
  }

  const params = {
    url: settings.url,
    headers: {
      'sg-application-id': `shop_${settings.shopNumber}`,
      'sg-device-id': settings.deviceId,
      'accept-encoding': 'plain',
      'sg-device-type': 'android-phone',
      'sg-api-codebase': '5.16.0',
      'accept-version': '~1',
    },
    body: req.body,
    json: true,
  };

  request.post(params, (err, response, body) => {
    if (err) {
      logger.error(err);
      return res.status(500).send('Could not connect to RAPID.');
    }

    if (response.statusCode !== 200) {
      const errMsg = body ? (body.errors || body.message) : 'Did not get 200 response from RAPID.';
      return res.status(response.statusCode).send(errMsg);
    }

    return res.json(body);
  });
}

module.exports = {
  handle,
  setup,
};
