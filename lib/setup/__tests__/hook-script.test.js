'use strict';

const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const tempy = require('tempy');
const { exists, read, write } = require('../../../__tests__/helpers');
const { sync, unsync } = require('../hook-script');


describe('lib/setup/hook-script', () => {
  let dir;
  let hooksDir;
  let hookFilePath;
  beforeEach(() => {
    dir = tempy.directory();
    hooksDir = path.resolve(dir, '.git/hooks');
    hookFilePath = path.resolve(dir, '.git/hooks/commit-msg');
    mkdirp.sync(hooksDir);
  });

  afterEach(() => rimraf.sync(dir));

  const gintDir = path.resolve(__dirname, '../..');

  describe('sync', () => {
    it('should create hook script if it did not exist beforehand', () => {
      sync(gintDir, hooksDir, 'commit-msg');
      expect(read(path.resolve(dir, '.git/hooks/commit-msg'))).toMatchSnapshot();
    });

    it('should amend hook script if it did exist beforehand', () => {
      write(hookFilePath, '#/bin/bash -e\necho "yey!";\n');
      sync(gintDir, hooksDir, 'commit-msg');
      expect(read(hookFilePath)).toMatchSnapshot();
    });

    it('should replace old hook format with new one', () => {
      write(hookFilePath, '#/bin/sh\n#gint 0.1.0\necho "old hook content goes here..."\n');
      sync(gintDir, hooksDir, 'commit-msg');
      expect(read(hookFilePath)).toMatchSnapshot();
    });

    it('should not fail for non-existent hook file', () => {
      sync(gintDir, hooksDir, 'karamba');
    });

    it('should keep only one instance of snippet in hook file', () => {
      sync(gintDir, hooksDir, 'commit-msg');
      sync(gintDir, hooksDir, 'commit-msg');
      sync(gintDir, hooksDir, 'commit-msg');
      expect(read(hookFilePath)).toMatchSnapshot();
    });
  });

  describe('unsync', () => {
    it('should remove hook script completely if used only by gint', () => {
      sync(gintDir, hooksDir, 'commit-msg');
      expect(exists(hookFilePath)).toBe(true);
      unsync(gintDir, hooksDir, 'commit-msg');
      expect(exists(hookFilePath)).toBe(false);
    });

    it('should remove hook snippet is hook script shared/edited', () => {
      write(hookFilePath, '#/bin/bash -e\necho "yey!";\n');
      sync(gintDir, hooksDir, 'commit-msg');
      unsync(gintDir, hooksDir, 'commit-msg');
      expect(read(hookFilePath)).toMatchSnapshot();
      expect(exists(hookFilePath)).toBe(true);
    });

    it('should not fail for non-existent hook file', () => {
      unsync(gintDir, hooksDir, 'karamba');
    });
  });
});
