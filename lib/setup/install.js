'use strict';

const hooks = require('./hooks');
const hookScript = require('./hook-script');
const { findHooksDir, isSetupRequired } = require('./utils');

const debug = require('debug')('gint:setup');

module.exports = (gintDir, logger) => {
  const hooksDir = findHooksDir(gintDir);

  debug('Syncing...');
  debug('%O', { hooksDir, gintDir });

  if (!isSetupRequired(gintDir)) {
    return false;
  }

  logger('Installing Git hooks');


  if (hooksDir) {
    hooks.forEach((hookName) => hookScript.sync(gintDir, hooksDir, hookName));
    return true;
  }

  logger('gint > Cannot find .git directory, skipping Git hooks installation');
  return false;
};
