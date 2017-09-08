'use strict';

const path = require('path');
const rimraf = require('rimraf');
const tempy = require('tempy');
const params = require('../params');
const { write } = require('../../__tests__/helpers');

describe('lib/params', () => {
  let dir;
  beforeEach(() => { dir = tempy.directory(); });
  afterEach(() => rimraf.sync(dir));

  describe('commit-msg', () => {
    it('should return commit contents', () => {
      write(path.join(dir, 'COMMIT_EDITMSG'), 'Fix all the bugs');
      expect(params({
        cwd: dir,
        hookName: 'commit-msg',
        hookParamsRaw: 'COMMIT_EDITMSG',
      })).toBe('Fix all the bugs');
    });
  });

  describe('everything else', () => {
    it('should do nothing special', () =>
      expect(params({
        hookName: 'kraken',
        hookParamsRaw: 'foobar',
      })).toBe('foobar')
    );
  });
});
