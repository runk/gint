'use strict';

// Run when package is uninstalled
const path = require('path');
const uninstall = require('../lib/setup/uninstall');

const gintDir = path.join(__dirname, '..');
uninstall(gintDir, console.log);
