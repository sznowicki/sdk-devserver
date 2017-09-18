/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const os = require('os');

/**
 * Returns the current local IP address.
 * @return {string}
 */
exports.getLocalIpAdresses = () => {
  // Resolve the local area network ip.
  const ifaces = os.networkInterfaces();
  let localIp = '127.0.0.1';

  Object.keys(ifaces).forEach((ifname) => {
    ifaces[ifname].forEach((iface) => {
      if (iface.family !== 'IPv4' || iface.internal !== false) {
        // Skip over internal and non-ipv4 addresses
        return;
      }
      localIp = iface.address;
    });
  });

  return localIp;
};
