'use strict'

const fs = require('fs')
const path = require('path')
const findParent = require('./utils/find-parent')
const findHooksDir = require('./utils/find-hooks-dir')
const getHookScript = require('./utils/get-hook-script')
const isGint = require('./utils/is-gint')
const hooks = require('./hooks.json')

const SKIP = 'SKIP'
const UPDATE = 'UPDATE'
const MIGRATE = 'MIGRATE'
const CREATE = 'CREATE'

function write(filename, data) {
  fs.writeFileSync(filename, data)
  fs.chmodSync(filename, parseInt('0755', 8))
}

function isGhooks(filename) {
  const data = fs.readFileSync(filename, 'utf-8')
  return data.indexOf('// Generated by ghooks. Do not edit this file.') !== -1
}

function createHook(gintDir, hooksDir, hookName) {
  const filename = path.join(hooksDir, hookName)

  // Assuming that this file is in node_modules/gint
  const packageDir = path.join(gintDir, '..', '..')

  // Get project directory
  // When used in submodule, the project dir is the first .git that is found
  const projectDir = findParent(gintDir, '.git')

  // In order to support projects with package.json in a different directory
  // than .git, find relative path from project directory to package.json
  const relativePath = path.join('.', path.relative(projectDir, packageDir))

  const hookScript = getHookScript(hookName, relativePath)

  // Create hooks directory if needed
  if (!fs.existsSync(hooksDir)) fs.mkdirSync(hooksDir)

  if (!fs.existsSync(filename)) {
    write(filename, hookScript)
    return CREATE
  }

  if (isGhooks(filename)) {
    write(filename, hookScript)
    return MIGRATE
  }

  if (isGint(filename)) {
    write(filename, hookScript)
    return UPDATE
  }

  return SKIP
}

function installFrom(gintDir) {
  try {
    const isInSubNodeModule = (gintDir.match(/node_modules/g) || []).length > 1
    if (isInSubNodeModule) {
      return console.log(
        "trying to install from sub 'node_module' directory,",
        'skipping Git hooks installation'
      )
    }

    const hooksDir = findHooksDir(gintDir)

    if (hooksDir) {
      hooks
        .map(function(hookName) {
          // const npmScriptName = hookName.replace(/-/g, '')
          return {
            hookName: hookName,
            action: createHook(gintDir, hooksDir, hookName)
          }
        })
        .forEach(function(item) {
          switch (item.action) {
            case MIGRATE:
              console.log(`migrating ghooks ${item.hookName} script`)
              break
            case UPDATE:
              break
            case SKIP:
              console.log(`skipping${item.hookName} hook (existing user hook)`)
              break
            case CREATE:
              break
            default:
              console.error('Unknown action')
          }
        })
      console.log('done\n')
    } else {
      console.log("can't find .git directory, skipping Git hooks installation")
    }
  } catch (e) {
    console.error(e)
  }
}

module.exports = installFrom