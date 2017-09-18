/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const express = require('express');
const request = require('request');
const logger = require('../../helpers/logger');
const { RAPID_URL } = require('../../constants');
const { shopNumber } = require('../../helpers/app').getDevConfig();
const webpackConfig = require('../../webpack.config');
const getIdsFromRapid = require('./getIdsFromRapid');
const commandApi = require('./commandApi');
const rapidApi = require('./rapidApi');
const { isProd, isStaging } = require('../../helpers/environment');

const prefix = logger.getShopgateCloudPrefix();

// Instanciate the router.
const router = express.Router();

if (process.env.USE_MOCK_DATA) {
  logger.log(`${prefix} Force using mock date.`);
  router.post('/', commandApi);
} else {
  request.get(`${RAPID_URL}/status`, (err, res) => {
    if (!err && res.statusCode === 200) {
      logger.log(`${prefix} RAPID available. Real data pipeline requests are possible.`);

      getIdsFromRapid(RAPID_URL, shopNumber, (error, sessionId, deviceId) => {
        rapidApi.setup({
          url: RAPID_URL,
          shopNumber,
          sessionId,
          deviceId,
        });

        router.post('/', rapidApi.handle);
      });
    } else {
      logger.log(`${prefix} RAPID not available, using mock data instead!`);
      router.post('/', commandApi);
    }
  });
}

/**
 * Open a special endpoint for WebStorage commands. These are
 * normally processed within the app and not sent to the backend.
 */
router.post('/web_storage', commandApi);

router.post('/ajax_cart_add_product', (req, res) => {
  res.json(req.body);
});

if (isProd || isStaging) {
  router.get('*', (req, res) => {
    logger.log('ALL');
    res.set('Content-Type', 'text/html');
    res.sendFile(`${webpackConfig.output.path}/index.html`);
  });
}

module.exports = router;
