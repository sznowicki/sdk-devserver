/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const request = require('request');
const logger = require('../helpers/logger');

const prefix = logger.getShopgateCloudPrefix();

/**
 * Sends all the answers the RAPID and registers the IP address.
 * @param {Object} answers All the answers.
 * @param {Object} options Some environment options.
 * @param {string} options.startPagePath The path to the startpage.
 * @return {Promise|Object}
 */
const registerSettingsWithRapid = (answers, { startPagePath }) => {
  const { confirmed, sgcloudSetup, ip, port, shopNumber } = answers;

  if (!confirmed) {
    return Promise.reject(`\n${prefix}: Sorry, you canceled the setup! Please try again.\n\n`);
  }

  if (sgcloudSetup) {
    const startPageUrl = `http://${ip}:${port}${startPagePath}`;
    const url = `https://jenkins.shopgate.services:8443/buildByToken/buildWithParameters?job=SGXS_frontend_start_page_url&token=${answers.accessToken}&START_PAGE_URL=${encodeURIComponent(startPageUrl)}&SHOP_NUMBER=shop_${shopNumber}`;

    return new Promise((success, fail) => {
      request(url, (err, response, body) => {
        if (err) {
          return fail(err);
        }

        if (response.statusCode !== 201) {
          return fail(new Error(`Wrong statusCode ${response.statusCode}. Message: ${body}`));
        }

        return success(answers);
      });
    });
  }

  return answers;
};

module.exports = registerSettingsWithRapid;
