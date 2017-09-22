/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { copyFiles, bumpVersion } = require('./index');

jest.mock('readline-sync', () => ({
  question: jest.fn()
    .mockImplementationOnce(() => '')
    .mockImplementationOnce(() => '1.0.0')
    .mockImplementationOnce(() => '1.1.0'),
}));

jest.mock('../logger', () => ({
  error: jest.fn(),
}));

jest.mock('../app', () => ({
  getPackageSettings: jest.fn(() => ({ version: '1.0.0' })),
}));

const prompt = require('readline-sync').question;
const logger = require('../logger');

describe('Helpers: release', () => {
  describe('copyFiles()', () => {
    it('should return null if no files found.', () => {
      const command = copyFiles(['somefile.js'], __dirname);

      expect(command).toBe(null);
    });

    it('should return null if no files are passed', () => {
      const command = copyFiles([], __dirname);

      expect(command).toBe(null);
    });

    it('should return a command if files are found', () => {
      const command = copyFiles(['mock.js'], __dirname);

      expect(command).toBe('cp -rf mock.js ./dist');
    });

    it('should return a command if file is in parent folder', () => {
      const command = copyFiles(['.gitkeep'], __dirname);

      expect(command).toBe('cp -rf ../.gitkeep ./dist');
    });
  });

  describe('bumpVersion()', () => {
    it('should return null if no version is set.', () => {
      const command = bumpVersion();

      expect(prompt).toBeCalled();
      expect(logger.error).toHaveBeenCalledWith('\nSORRY! The version number was not valid. Please try again.\n');
      expect(command).toEqual(null);
    });

    it('should return null if the same version was supplied.', () => {
      const command = bumpVersion();

      expect(prompt).toBeCalled();
      expect(logger.error).toHaveBeenCalledWith('\nERROR: The version \'1.0.0\' already exists. Please try again.\n');
      expect(command).toBe(null);
    });

    it('should return a command string if the version can be bumped.', () => {
      const command = bumpVersion();

      expect(Array.isArray(command)).toBe(true);
      expect(command[0]).toBe('npm version 1.1.0');
      expect(command[1]).toBe('1.1.0');
    });
  });
});
