'use strict';

const fs = require('fs');

exports.write = (filePath, data) => fs.writeFileSync(filePath, data);

exports.read = (filePath) => fs.readFileSync(filePath, 'utf-8');

exports.exists = (filePath) => fs.existsSync(filePath);
