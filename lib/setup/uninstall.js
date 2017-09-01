'use strict';

const hooks = require('./hooks');
const hookScript = require('./hook-script');
const { findHooksDir, isSetupRequired } = require('./utils');

const debug = require('debug')('gint:setup');

module.exports = (gintDir) => {
  try {
    const hooksDir = findHooksDir(gintDir);

    if (!isSetupRequired(gintDir)) {
      return;
    }

    debug('Unsyncing...');
    debug('%O', { hooksDir, gintDir });

    console.log('Uninstalling GIT hooks');

    hooks.forEach((hookName) => hookScript.unsync(gintDir, hooksDir, hookName));
  } catch (e) {
    console.error(e);
  }
};
