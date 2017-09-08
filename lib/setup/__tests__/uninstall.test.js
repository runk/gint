'use strict';

const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const tempy = require('tempy');
const { exists } = require('../../../__tests__/helpers');
const install = require('../install');
const uninstall = require('../uninstall');


describe('lib/setup/uninstall', () => {

  const logger = () => {};

  let dir;
  let hooksDir;
  let hookFilePath;
  let gintDir;
  beforeEach(() => {
    dir = tempy.directory();
    hookFilePath = path.resolve(dir, '.git/hooks/commit-msg');

    hooksDir = path.resolve(dir, '.git/hooks');
    mkdirp.sync(hooksDir);

    gintDir = path.resolve(dir, 'node_modules/gint');
    mkdirp(gintDir);
  });

  afterEach(() => rimraf.sync(dir));

  it('should perform uninstall (aka unsync)', () => {
    expect(install(gintDir, logger)).toBe(true);
    expect(exists(hookFilePath)).toBe(true);
    expect(uninstall(gintDir, logger)).toBe(true);
    expect(exists(hookFilePath)).toBe(false);
  });

  it('should not perform uninstall from gint project', () => {
    expect(uninstall(__dirname, logger)).toBe(false);
    expect(exists(hookFilePath)).toBe(false);
  });

  it('should not perform uninstall when git directory cannot be found', () => {
    rimraf.sync(path.resolve(dir, '.git'));
    expect(uninstall(gintDir, logger)).toBe(false);
    expect(exists(hookFilePath)).toBe(false);
  });
});
