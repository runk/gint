const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const tempy = require('tempy');
const install = require('./install');

const mkdir(rootDir, dir) => mkdirp.sync(path.join(rootDir, dir));

function writeFile(dir, filePath, data) {
  fs.writeFileSync(path.join(dir, filePath), data);
}

function readFile(dir, filePath) {
  return fs.readFileSync(path.join(dir, filePath), 'utf-8');
}

function exists(dir, filePath) {
  return fs.existsSync(path.join(dir, filePath));
}

describe('lib/setup/install', () => {
  it('should work for very basic case', () => {

  });
});
