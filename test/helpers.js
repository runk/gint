const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const tempy = require('tempy');

exports.write = (dir, filePath, data) => fs.writeFileSync(path.join(dir, filePath), data);

exports.read = (dir, filePath) => fs.readFileSync(path.join(dir, filePath), 'utf-8');

exports.exists = (dir, filePath) => fs.existsSync(path.join(dir, filePath));
