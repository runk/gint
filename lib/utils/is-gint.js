'use strict';

const fs = require('fs');

module.exports = function isGint(filename) {
  const data = fs.readFileSync(filename, 'utf-8');
  return data.indexOf('#gint') !== -1;
};
