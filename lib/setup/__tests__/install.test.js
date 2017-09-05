const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const tempy = require('tempy');
const { exists ,read, write } = require('../../../__tests__/helpers');
const install = require('../install');


describe('lib/setup/install', () => {

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

  it('should perform install (aka sync)', () => {
    expect(install(gintDir, logger)).toBe(true);
    expect(exists(hookFilePath)).toBe(true);
  });

  it('should not perform install from gint project', () => {
    expect(install(__dirname, logger)).toBe(false);
    expect(exists(hookFilePath)).toBe(false);
  });

  it('should not perform install when git directory cannot be found', () => {
    rimraf.sync(path.resolve(dir, '.git'));
    expect(install(gintDir, logger)).toBe(false);
    expect(exists(hookFilePath)).toBe(false);
  });
});
