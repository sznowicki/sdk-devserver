/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const remotedev = require('remotedev-server');
const { isRemote } = require('../helpers/environment');
const webpackConfig = require('../webpack.config');

/**
 * Adds hot reloading to the dev app.
 * @param {Object} app The current application instance.
 * @param {Object} config The app configuration.
 */
module.exports = (app, { ip, hmrPort }) => {
  // Instantiate the webpack.
  const compiler = webpack(webpackConfig);

  // Apply the webpack dev server.
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    stats: {
      colors: true,
    },
  });

  // Apply the webpack hot middleware.
  const hotMiddleware = webpackHotMiddleware(compiler, {
    port: hmrPort,
  });

  if (isRemote) {
    // Apply the redux remote dev tools if needed.
    remotedev({
      hostname: ip,
      port: 8008,
    });
  }

  app.use(devMiddleware);
  app.use(hotMiddleware);

  app.get('*', (req, res) => {
    const filePath = `${webpackConfig.output.path}/index.html`;

    res.set('Content-Type', 'text/html');
    res.send(devMiddleware.fileSystem.readFileSync(filePath));
  });
};
