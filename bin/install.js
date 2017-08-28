'use strict'

// Run when package is installed
const path = require('path')
const isCI = require('is-ci')
const installFrom = require('../lib/install')

if (isCI && !process.env.GINT_IGNORE_CI) {
  console.log('CI detected, skipping Git hooks installation')
  process.exit(0)
}

console.log('Installing Git hooks')

const gintDir = path.join(__dirname, '..')
installFrom(gintDir)
