'use strict';

// Run when package is installed
const path = require('path');
const isCI = require('is-ci');
const install = require('../lib/setup/install');

if (isCI && !process.env.GINT_IGNORE_CI) {
  console.log('CI detected, skipping Git hooks installation');
  process.exit(0);
}

const gintDir = path.join(__dirname, '..');
install(gintDir, console.log);
