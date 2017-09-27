/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { writeFileSync } = require('fs');
const { resolve } = require('path');
const chalk = require('chalk');
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');
const { isDev } = require('../helpers/environment');
const configs = require('../helpers/app').getComponentsSettings();

const logger = console;

/**
 * Generates the extensions index file.
 * @param {Object} moduleConfig The module configuration.
 */
const getExtensionIndex = (moduleConfig) => {
  const extensionPath = moduleConfig.path;
  const imports = [];
  const exports = ['export default {'];

  Object.keys(configs).forEach((configId) => {
    const config = configs[configId];

    Object.keys(config).forEach((widgetId) => {
      const component = config[widgetId];
      const componentPath = isDev ? component.path.replace('/dist/', '/src/') : component.path;

      /**
       * The variable name to be used in import and export statement.
       * @type {string}
       */
      const componentVariableName = upperFirst(
        camelCase(widgetId.replace(/@/g, '').replace(/\//g, '-'))
      );

      logger.log(` indexing '${chalk.bold(widgetId)}'`);

      // Add the component to the imports.
      imports.push(`import ${componentVariableName} from './${componentPath}';`);
      // Add the component to the exported object.
      exports.push(`  '${widgetId}': ${componentVariableName},`);
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
