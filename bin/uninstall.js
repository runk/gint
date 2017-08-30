'use strict';

// Run when package is uninstalled
const path = require('path');
const uninstallFrom = require('../lib/setup/uninstall');

const gintDir = path.join(__dirname, '..');
uninstallFrom(gintDir);
