/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const mock = require('../mockData/getWebStorageEntry');

/**
 * The getWebStorageEntry command.
 * @param {Object} parameter the command parameters.
 * @param {Function} callback The API callback.
 */
module.exports = (parameter, callback) => {
  const name = parameter.name;

  const answerCommand = {
    c: 'webStorageResponse',
    p: {
      serial: parameter.serial,
      age: null,
      value: null,
    },
  };

  mock.get(name, (error, age, value) => {
    answerCommand.p.value = value;
    answerCommand.p.age = age;

    callback(null, answerCommand);
  });
};
