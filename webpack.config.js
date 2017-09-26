/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

const { resolve } = require('path');
const { green, blue } = require('chalk');
const webpack = require('webpack');
const {
  ENV,
  isDev,
  isStaging,
  isProd,
  isRemote,
  isAnalyze,
  projectPath,
  sourcemap,
} = require('./helpers/environment');
const { publicPath, language, shopName } = require('./helpers/app').getAppSettings();
const { ip, port } = require('./helpers/app').getDevConfig();
const { getRemoteWebpackConfig, convertLanguageToISO } = require('./helpers/webpack');

/**
 * LANGUAGE
 */

const lang = convertLanguageToISO(language || 'en-us');

/**
 * PLUGINS DEFINITIONS
 */

const plugins = [];

plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(ENV),
      LANG: JSON.stringify(lang),
      REMOTE: JSON.stringify(isRemote),
      IP: JSON.stringify(ip),
      PORT: JSON.stringify(port),
    },
  }),
  new webpack.LoaderOptionsPlugin({
    debug: isDev,
    options: {
      context: projectPath,
      output: {
        path: resolve(projectPath, 'public'),
      },
    },
  }),
  new webpack.IgnorePlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    minChunks: 2,
    name: 'common',
    filename: (isProd || isStaging) ? '[name].[chunkhash].js' : '[name].js',
  }),
  new webpack.HashedModuleIdsPlugin()
);

plugins.push(
  new (require('html-webpack-plugin'))({
    title: shopName || '',
    filename: resolve(projectPath, 'public', 'index.html'),
    template: resolve(__dirname, 'views', 'app.ejs'),
    inject: false,
    cache: false,
    minify: false,
    showErrors: isDev,
    xhtml: true,
  }),
  new (require('preload-webpack-plugin'))({
    rel: 'prefetch',
    as: 'script',
    include: 'asyncChunks',
  })
);

if (isStaging || isProd) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
      comments: false,
      sourceMap: true,
    }),
    new (require('compression-webpack-plugin'))({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$/,
      minRatio: 0.8,
    })
  );
}

if (isStaging || isProd) {
  plugins.push(
    new (require('offline-plugin'))()
  );
}

if (isDev) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new (require('webpack-dashboard/plugin'))()
  );

  if (isAnalyze) {
    plugins.push(
      new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin()
    );
  }
}

plugins.push(
  new (require('progress-bar-webpack-plugin'))({
    format: `  building [${blue(':bar')}] [:msg] ${green(':percent')} (:elapsed seconds)`,
    clear: false,
  })
);

/**
 * HOT MODULE REPLACEMENT
 */

const hotEntry = (!isStaging && !isProd) ? [
  resolve(__dirname, 'node_modules', 'react-hot-loader/patch'),
  resolve(__dirname, 'node_modules', 'webpack-hot-middleware/client'),
] : [];

/**
 * CACHING
 */

const cacheEntry = (isStaging || isProd) ? [
  resolve(__dirname, 'modules', 'cache'),
] : [];

const performance = (isDev) ? [
  resolve(__dirname, 'modules', 'performance'),
] : [];
/**
 * Gets the source map mode which should be used within
 * the webpack config.
 * @return {string}
 */
const getSourceMapType = () => {
  if (sourcemap) {
    return sourcemap;
  }
  if (isDev) {
    return 'cheap-eval-source-map';
  }
  return 'cheap-source-map';
};
/**
 * WEBPACK CONFIG
 */

const config = {
  context: projectPath,
  entry: {
    common: [
      resolve(__dirname, 'node_modules', 'babel-polyfill'),
      resolve(__dirname, 'node_modules', 'intl'),
      resolve(__dirname, 'node_modules', `intl/locale-data/jsonp/${lang}.js`),
      'gsap',
      'react',
      'react-dom',
      resolve(__dirname, 'modules', 'legacy'),
      ...performance,
    ],
    app: [
      ...hotEntry,
      resolve(projectPath, 'index.jsx'),
      ...cacheEntry,
    ],
  },
  output: {
    filename: (isStaging || isProd) ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    path: resolve(projectPath, 'public'),
    publicPath: publicPath || ((isStaging || isProd) ? './' : '/static/'),
  },
  devtool: getSourceMapType(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          resolve(__dirname, 'node_modules', 'style-loader'),
          resolve(__dirname, 'node_modules', 'css-loader'),
        ],
      },
      {
        test: /\.json$/,
        use: [
          resolve(__dirname, 'node_modules', 'json-loader'),
        ],
      },
      {
        test: /\.ejs/,
        use: [
          resolve(__dirname, 'node_modules', 'ejs-loader'),
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [
          resolve(__dirname, 'server'),
          resolve(__dirname, 'bin'),
        ],
        use: [
          resolve(__dirname, 'node_modules', 'cache-loader'),
          {
            loader: resolve(__dirname, 'node_modules', 'babel-loader'),
            options: {
              compact: true,
              comments: !!isDev,
              sourceRoot: projectPath,
              cacheDirectory: !isDev,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    modules: [
      resolve(projectPath, 'node_modules'),
      resolve(__dirname, 'node_modules'),
    ],
  },
  plugins,
  target: 'web',
  performance: {
    hints: false,
  },
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  stats: (isStaging || isProd) ? 'errors-only' : 'normal',
  devServer: {
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    progress: true,
  },
  watchOptions: {
    ignored: /node_modules\b(?!\/@shopgate)\b.*/,
  },
};

// Return the remote webpack config of the default.
module.exports = getRemoteWebpackConfig() || config;

/* eslint-enable global-require */
