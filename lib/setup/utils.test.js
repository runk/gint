const utils = require('./utils');
const helpers = require('../../test/helpers');

const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const tempy = require('tempy');

describe('lib/setup/utils', () => {
  describe('isSetupRequired()', () => {
    it('should return true for normal confidions', () => {
      expect(utils.isSetupRequired('/Users/kraken/project/node_modules/gint')).toBe(true);
    });

    it('should return false when installed as sub dependency', () => {
      expect(utils.isSetupRequired('/Users/kraken/project/node_modules/foo/node_modules/gint')).toBe(false);
    });

    it('should return false when in gint home directory', () => {
      expect(utils.isSetupRequired('/Users/kraken/project/gint')).toBe(false);
    });
  });

  describe('findHooksDir()', () => {
    let dir;
    beforeEach(() => { dir = tempy.directory(); });
    afterEach(() => rimraf.sync(dir));

    it('should work fine for normal confidions', () => {
      mkdirp.sync(path.join(dir, '.git'));
      mkdirp.sync(path.join(dir, 'foo/bar/baz'));

      const hooksDir = path.join(dir, '.git/hooks');
      expect(utils.findHooksDir(path.join(dir, 'foo'))).toBe(hooksDir);
      expect(utils.findHooksDir(path.join(dir, 'foo/bar'))).toBe(hooksDir);
      expect(utils.findHooksDir(path.join(dir, 'foo/bar/baz'))).toBe(hooksDir);
    });

    it('should throw when cannot find directory', () =>
      expect(() => utils.findHooksDir('/')).toThrow(/Cannot find hooks directory/)
    );
  });
});
