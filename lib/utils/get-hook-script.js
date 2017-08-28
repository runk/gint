'use strict'

const path = require('path');
const normalize = require('normalize-path')
const stripIndent = require('strip-indent')

const pkg = require('../../package.json')

const handlerFilepath = path.join(__dirname, '../../bin/handler');

function platformSpecific() {
  // On OS X and Linux, try to use nvm if it's installed
  if (process.platform === 'win32') {
    // Add
    // Node standard installation path /c/Program Files/nodejs
    // for GUI apps
    // https://github.com/typicode/husky/issues/49
    return stripIndent(
      `
      # Node standard installation
      export PATH="$PATH:/c/Program Files/nodejs"`
    )
  } else {
    // Using normalize to support ' in path
    // https://github.com/typicode/husky/issues/117
    const home = normalize(process.env.HOME)

    const arr = [
      stripIndent(
        `
        load_nvm () {
          # If nvm is not loaded, load it
          command_exists nvm || {
            export NVM_DIR=${home}/.nvm
            [ -s "$1/nvm.sh" ] && \. "$1/nvm.sh"
          }

          # If nvm has been loaded correctly, use project .nvmrc
          command_exists nvm && [ -f .nvmrc ] && nvm use
        }

        # Add common path where Node can be found
        # Brew standard installation path /usr/local/bin
        # Node standard installation path /usr/local
        export PATH="$PATH:/usr/local/bin:/usr/local"`
      )
    ]

    arr.push(
      stripIndent(
        `
        # nvm path with standard installation
        load_nvm ${home}/.nvm`
      )
    )

    if (process.platform === 'darwin') {
      arr.push(
        stripIndent(
          `
          # nvm path installed with Brew
          load_nvm /usr/local/opt/nvm`
        )
      )
    }

    return arr.join('\n')
  }
}

module.exports = function getHookScript(hookName, relativePath, npmScriptName) {
  // On Windows normalize path (i.e. convert \ to /)
  const normalizedPath = normalize(relativePath)

  const noVerifyMessage = hookName === 'prepare-commit-msg'
    ? '(cannot be bypassed with --no-verify due to Git specs)'
    : '(add --no-verify to bypass)'

  return [
    stripIndent(
      `
      #!/bin/sh
      #gint ${pkg.version}

      command_exists () {
        command -v "$1" >/dev/null 2>&1
      }

      cd "${normalizedPath}"
      `
    ).trim(),

    platformSpecific(),

    stripIndent(
      `
      # Check that node exists
      command_exists node || {
        echo >&2 "gint > can't find node in PATH, skipping ${hookName} git hook"
        exit 0
      }

      # Export Git hook params
      export GIT_PARAMS="$*"

      ${handlerFilepath} ${hookName}
      `
    )
  ].join('\n')
}
