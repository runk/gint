'use strict';

const hooks = require('./hooks');
const findHooksDir = require('./utils/find-hooks-dir');
const hookScript = require('./utils/hook-script');
const isSetupRequired = require('./utils/is-setup-required');

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
