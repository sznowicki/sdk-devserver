/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('Helpers: webpack - getSourceMapType()', () => {
  afterEach(() => {
    jest.resetModules();
  });
  it('should return sourcemap from cli argument for development stage', () => {
    jest.doMock(('../environment'), () => ({
      isDev: true,
      sourcemap: 'foo',
    }));
    const getSourceMapType = require('./getSourceMapType'); // eslint-disable-line global-require
    expect(getSourceMapType()).toBe('foo');
  });
  it('should return sourcemap from cli argument for non-development stage', () => {
    jest.doMock(('../environment'), () => ({
      isDev: false,
      sourcemap: 'foo',
    }));
    const getSourceMapType = require('./getSourceMapType');  // eslint-disable-line global-require
    expect(getSourceMapType()).toBe('foo');
  });
  it('should return cheap-eval-source-map for development stage', () => {
    jest.doMock(('../environment'), () => ({
      isDev: true,
      sourcemap: null,
    }));
    const getSourceMapType = require('./getSourceMapType'); // eslint-disable-line global-require
    expect(getSourceMapType()).toBe('cheap-eval-source-map');
  });
  it('should return cheap-source-map for development stage', () => {
    jest.doMock(('../environment'), () => ({
      isDev: false,
      sourcemap: null,
    }));
    const getSourceMapType = require('./getSourceMapType'); // eslint-disable-line global-require
    expect(getSourceMapType()).toBe('cheap-source-map');
  });
});
