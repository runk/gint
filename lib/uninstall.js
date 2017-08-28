'use strict'

const fs = require('fs')
const hooks = require('./hooks.json')
const findHooksDir = require('./utils/find-hooks-dir')
const isGint = require('./utils/is-gint')

function removeHook(dir, name) {
  const filename = `${dir}/${name}`

  if (fs.existsSync(filename) && isGint(filename)) {
    fs.unlinkSync(`${dir}/${name}`)
  }
}

function uninstallFrom(gintDir) {
  try {
    const hooksDir = findHooksDir(gintDir)

    hooks.forEach(function(hookName) {
      removeHook(hooksDir, hookName)
    })
    console.log('done\n')
  } catch (e) {
    console.error(e)
  }
}

module.exports = uninstallFrom
