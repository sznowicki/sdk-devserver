/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const request = require('request');
const appStartCommand = require('./app-start-command.json');

/**
 * Get sessionId and deviceId by sending an appStart to the RAPID
 * @param {string} url Endpoint of the RAPID
 * @param {string} shopNumber Number of the shop that the request are for
 * @param {Function} cb Callback
 */
module.exports = (url, shopNumber, cb) => {
  appStartCommand.p.appIdentifier = `shop:${shopNumber}`;

  const params = {
    url,
    headers: {
      'sg-application-id': `shop_${shopNumber}`,
      'accept-encoding': 'plain',
      'sg-device-type': 'android-phone',
      'sg-api-codebase': '5.16.0',
      'accept-version': '~1',
    },
    json: true,
    body: {
      cmds: [appStartCommand],
      ver: '1.2',
    },
  };

  request.post(params, (err, res, body) => {
    if (err) {
      return cb(err);
    }

    if (!body || !body.cmds) {
      return cb(new Error('No response commands from rapid'));
    }

    return cb(null, body.cmds[0].p.value, res.headers['sg-device-id']);
  });
};
