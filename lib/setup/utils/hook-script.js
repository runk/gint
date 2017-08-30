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

exports.sync = (gintDir, hooksDir, hookName) => {
  const hookPath = path.join(hooksDir, hookName);
  const bootstrapPath = path.join(gintDir, 'bin/bootstrap');

  debug('Syncing %s hook', hookName);

  if (!fs.existsSync(hookPath)) {
    debug('Not found, creating dummy file with shebang');
    write(hookPath, shebang);
  }

  const hookScript = read(hookPath);

  if (hookScript.indexOf('#gint 0.') !== -1) {
    debug('Old version of gint script found, migrating');
    write(hookPath, `${shebang}\n\n${bootstrapPath} ${hookName}\n`);

  } else if (hookScript.indexOf(bootstrapPath) === -1) {
    debug('Bootstrap line isnt found, amending hook script');
    write(hookPath, `${hookScript}\n\n${bootstrapPath} ${hookName}\n`);
  }

  debug('Bootstrap line found, all good');
};

exports.unsync = (gintDir, hooksDir, hookName) => {
  const hookPath = path.join(hooksDir, hookName);
  const bootstrapPath = path.join(gintDir, 'bin/bootstrap');

  debug('Unsyncing %s hook', hookName, hookPath);
  if (!fs.existsSync(hookPath)) {
    debug('Not found, nothing more to do');
    return;
  }

  let hookScript = read(hookPath);
  hookScript = hookScript.replace(`${bootstrapPath} ${hookName}\n`, '').trim() + '\n';

  debug('Sanitizing script');
  if (hookScript.trim() === shebang) {
    fs.unlinkSync(hookPath);
  } else {
    write(hookPath, hookScript);
  }
};
