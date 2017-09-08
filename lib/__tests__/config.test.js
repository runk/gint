'use strict';

const _ = require('lodash');
const path = require('path');
const rimraf = require('rimraf');
const tempy = require('tempy');
const config = require('../config');
const { write } = require('../../__tests__/helpers');

describe('lib/config', () => {
  let dir;
  beforeEach(() => { dir = tempy.directory(); });
  afterEach(() => rimraf.sync(dir));

  describe('config file names', () => {
    const configData = {
      rules: {
        'commit-message-pattern': ['error', '[a-z]+', 'i'],
        'commit-min-len': ['error', 10],
        'commit-max-len': ['error', 512]
      },
    };

    _.each([
      '.gintrc.json',
      '.gintrc',
    ], (file) => {
      it(`should pick "${file}" as config`, () => {
        write(path.join(dir, file), `{
          // Rules go here
          "rules": {
            "commit-message-pattern": ["error", "[a-z]+", "i"],
            "commit-min-len": ["error", 10],
            "commit-max-len": ["error", 512]
          }
        }`);
        expect(config(dir)).toEqual(configData);
      });
    });

    it('should pick "package.json" as config', () => {
      write(path.join(dir, 'package.json'), `{
        "name": "awesome third-pary module",
        "gintConfig": {
          "rules": {
            "commit-message-pattern": ["error", "[a-z]+", "i"],
            "commit-min-len": ["error", 10],
            "commit-max-len": ["error", 512]
          }
        },
        "scripts": {}
      }`);
      expect(config(dir)).toEqual(configData);
    });

    it('should pick ".gintrc.js" as config', () => {
      write(path.join(dir, '.gintrc.js'), `module.exports = {
        // Rules go here
        "rules": {
          "commit-message-pattern": ["error", "[a-z]+", "i"],
          "commit-min-len": ["error", 10],
          "commit-max-len": ["error", 512]
        }
      }`);
      expect(config(dir)).toEqual(configData);
    });

    it('should return null if no configs found', () => {
      expect(config(dir)).toBe(null);
    });
  });
});
