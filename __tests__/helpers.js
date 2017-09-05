const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const tempy = require('tempy');

exports.write = (filePath, data) => fs.writeFileSync(filePath, data);

exports.read = (filePath) => fs.readFileSync(filePath, 'utf-8');

exports.exists = (filePath) => fs.existsSync(filePath);
