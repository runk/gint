'use strict'

// Run when package is uninstalled
const path = require('path')
const uninstallFrom = require('../lib/uninstall')

console.log('Uninstalling GIT hooks');

const gintDir = path.join(__dirname, '..')
uninstallFrom(gintDir)
