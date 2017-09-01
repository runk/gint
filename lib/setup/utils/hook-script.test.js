const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const tempy = require('tempy');
const { sync, unsync } = require('./hook-script');

const mkdir = (rootDir, dir) => mkdirp.sync(path.join(rootDir, dir));

const write = (dir, filePath, data) => fs.writeFileSync(path.join(dir, filePath), data);

const read = (dir, filePath) => fs.readFileSync(path.join(dir, filePath), 'utf-8');

const exists = (dir, filePath) => fs.existsSync(path.join(dir, filePath));

describe('lib/setup/utils/hook-script', () => {
  let dir;
  beforeEach(() => { dir = tempy.directory(); });
  afterEach(() => rimraf.sync(dir));

  it('should work for very basic case', () => {

  });
});
