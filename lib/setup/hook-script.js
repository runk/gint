'use strict';

const fs = require('fs');
const path = require('path');
const debug = require('debug')('gint:hook-script');

const shebang = '#!/bin/sh';


const write = (filename, data) => {
  fs.writeFileSync(filename, data);
  fs.chmodSync(filename, parseInt('0755', 8));
};

const read = (filename) => fs.readFileSync(filename, 'utf-8');

const makeSnippet = (gintDir, hookName) =>
  `HOOK_PARAMS="$*" HOOK_NAME="${hookName}" ${path.join(gintDir, 'bin/bootstrap')}`;

exports.sync = (gintDir, hooksDir, hookName) => {
  const hookPath = path.join(hooksDir, hookName);
  const snippet = makeSnippet(gintDir, hookName);

  debug('Syncing %s hook', hookName);

  if (!fs.existsSync(hookPath)) {
    debug('Not found, creating dummy file with shebang');
    write(hookPath, shebang);
  }

  const hookScript = read(hookPath);

  if (hookScript.indexOf('#gint 0.') !== -1) {
    debug('Old version of gint script found, migrating');
    write(hookPath, `${shebang}\n\n${snippet}\n`);

  } else if (hookScript.indexOf(snippet) === -1) {
    debug('Snippet isnt found, amending hook script');
    write(hookPath, `${hookScript}\n\n${snippet}\n`);

  } else {
    debug('Snippet found, nothing to do');
  }

  debug('Snippet found, all good');
};

exports.unsync = (gintDir, hooksDir, hookName) => {
  const hookPath = path.join(hooksDir, hookName);
  const snippet = makeSnippet(gintDir, hookName);

  debug('Unsyncing %s hook', hookName, hookPath);
  if (!fs.existsSync(hookPath)) {
    debug('Not found, nothing more to do');
    return;
  }

  let hookScript = read(hookPath);
  hookScript = hookScript.replace(`${snippet}`, '').trim() + '\n';

  debug('Sanitizing script');
  if (hookScript.trim() === shebang) {
    fs.unlinkSync(hookPath);
  } else {
    write(hookPath, hookScript);
  }
};
