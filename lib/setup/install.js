'use strict';

const hooks = require('./hooks');
const hookScript = require('./hook-script');
const { findHooksDir, isSetupRequired } = require('./utils');

const debug = require('debug')('gint:setup');

module.exports = (gintDir) => {
  try {
    const hooksDir = findHooksDir(gintDir);
    debug('Syncing...');
    debug('%O', { hooksDir, gintDir });

    if (!isSetupRequired(gintDir)) {
      return;
    }

    console.log('Installing Git hooks');

    if (hooksDir) {
      hooks.forEach((hookName) => hookScript.sync(gintDir, hooksDir, hookName));
    } else {
      console.error('gint > Cannot find .git directory, skipping Git hooks installation');
    }
  } catch (e) {
    console.error(e);
  }
};
