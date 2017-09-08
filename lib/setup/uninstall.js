'use strict';

const hooks = require('./hooks');
const hookScript = require('./hook-script');
const { findHooksDir, isSetupRequired } = require('./utils');

const debug = require('debug')('gint:setup');

module.exports = (gintDir, logger) => {
  const hooksDir = findHooksDir(gintDir);
  debug('Unsyncing...');
  debug('%O', { hooksDir, gintDir });

  if (!isSetupRequired(gintDir)) {
    return false;
  }

  logger('Uninstalling GIT hooks');

  if (hooksDir) {
    hooks.forEach((hookName) => hookScript.unsync(gintDir, hooksDir, hookName));
    return true;
  }

  logger('gint > Cannot find .git directory, skipping Git hooks un-installation');
  return false;
};
