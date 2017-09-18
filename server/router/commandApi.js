/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const async = require('async');

/**
 * The mock api endpoint for app commands
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The middleware switch.
 */
const commandApi = (req, res, next) => {
  const { cmds } = req.body;

  if (cmds && cmds.length !== 0) {
    let responseCommands = [];

    async.eachSeries(cmds, (command, callback) => {
      const name = (command.c === 'pipelineRequest') ? 'sendPipelineRequest' : command.c;
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const fn = require(`./appCommands/${name}`);

      if (!fn) {
        return callback(new Error(`Command ${name} not found`));
      }

      fn(command.p, (err, commands) => {
        if (err) {
          return callback(err);
        }

        responseCommands = responseCommands.concat(commands);

        return callback();
      });

      return null;
    }, (err) => {
      if (err) {
        return next(err);
      }

      const responseJSON = {
        ver: '9.0',
        vars: {},
        cmds: responseCommands,
      };

      return res.json(responseJSON);
    });
  }
};

module.exports = commandApi;
