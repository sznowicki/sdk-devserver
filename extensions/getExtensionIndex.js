/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { writeFileSync } = require('fs');
const { resolve, join } = require('path');
const chalk = require('chalk');
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');
const getConfigs = require('./getConfigs');

const logger = console;

const PATH_FRONTEND = 'frontend';

/**
 * Generates the extensions index file.
 * @param {Object} moduleConfig The module configuration.
 */
const getExtensionIndex = (moduleConfig) => {
  const configs = getConfigs(moduleConfig);
  const extensionPath = moduleConfig.path;
  const imports = [];
  const exports = ['export default {'];

  Object.keys(configs).forEach((configId) => {
    const config = configs[configId];

    config.forEach((component) => {
      /**
       * This path is only used to be shown in the console logs.
       * @type {string}
       */
      const logPath =
        resolve(extensionPath, configId, PATH_FRONTEND, component.path).replace(extensionPath, '');

      /**
       * The full path to the component file used for imports.
       * The file extensions are stripped away because of codestyle rules.
       * @type {string}
       */
      const componentPath =
        join(configId, PATH_FRONTEND, component.path)
          .replace('index.jsx', '')
          .replace('index.js', '')
          .replace('.jsx', '')
          .replace('.js', '');

      /**
       * The variable name to be used in import and export statement.
       * @type {string}
       */
      const componentVariableName = upperFirst(camelCase(`${configId}_${component.id}`));

      /**
       * The component can be accessed with this hash.
       * @type {string}
       */
      const extensionHash = `${configId}/${component.id}`;

      logger.log(` indexing '${chalk.bold(logPath)}'`);

      // Add the component to the imports.
      imports.push(`import ${componentVariableName} from './${componentPath}';`);
      // Add the component to the exported object.
      exports.push(`  '${extensionHash}': ${componentVariableName},`);
    });
  });

  exports.push('};');

  const importsString = imports.length ? `${imports.join('\n')}\n\n` : '';
  const indexString = `${importsString}${exports.join('\n')}\n`;
  const indexFile = resolve(extensionPath, 'index.js');

  writeFileSync(indexFile, indexString);

  if (typeof moduleConfig.callback === 'function') {
    moduleConfig.callback();
  }
};

module.exports = getExtensionIndex;
