'use strict';

const path = require('path');
const rimraf = require('rimraf');
const tempy = require('tempy');
const runner = require('../runner');
const { write } = require('../../__tests__/helpers');

describe('lib/runner', () => {
  let dir;
  beforeEach(() => { dir = tempy.directory(); });
  afterEach(() => rimraf.sync(dir));

  describe('strict config', () => {
    const config = {
      rules: {
        'commit-min-len': ['error', 10],
        'commit-max-len': ['warn', 512]
      }
    };

    it('should return correct output - no errors', () =>
      runner(config, { hookName: 'commit-msg', hookParams: 'Fix all the things' })
        .then((output) => expect(output).toBe(''))
    );

    it('should return correct output - errors', () =>
      runner(config, { hookName: 'commit-msg', hookParams: 'Fix' })
        .catch((output) => expect(output).toMatchSnapshot())
    );

    it('should return correct output - no errors when no applicable rules for hook', () =>
      runner(config, { hookName: 'pre-commit', hookParams: 'Fix' })
        .catch((output) => expect(output).toBe(''))
    );
  });

  describe('silent config', () => {
    const config = {
      rules: {
        'commit-min-len': ['ignore', 10],
      }
    };

    it('should return correct output - no errors', () =>
      runner(config, { hookName: 'commit-msg', hookParams: 'Fix all the things' })
        .then((output) => expect(output).toBe(''))
    );

    it('should return correct output - errors', () =>
      runner(config, { hookName: 'commit-msg', hookParams: 'Fix' })
        .catch((output) => expect(output).toBe(''))
    );
  });

  describe('non-strict config', () => {
    const config = {
      rules: {
        'commit-min-len': ['warn', 10],
        'commit-max-len': ['warn', 512],
        "commit-message-pattern": ["warning", "^\\[(patch|minor|major)\\]\\s.{3,}", "i"],
      }
    };

    it('should return correct output - no errors', () =>
      runner(config, { hookName: 'commit-msg', hookParams: '[patch] Fix all the things' })
        .then((output) => expect(output).toBe(''))
    );

    it('should return correct output - errors', () =>
      runner(config, { hookName: 'commit-msg', hookParams: 'Fix' })
        .then((output) => expect(output).toMatchSnapshot())
    );
  });
});
