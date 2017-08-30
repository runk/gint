'use strict';

const debug = require('debug')('gint:setup');

module.exports = (gintDir) => {
  const isInSubNodeModule = (gintDir.match(/node_modules/g) || []).length > 1;
  if (isInSubNodeModule) {
    debug('Trying to install from sub \'node_module\' directory, skipping');
    return false;
  }

  const isSelf = !/node_modules/.test(gintDir);
  if (isSelf) {
    debug('Trying to install for itself, skipping');
    return false;
  }

  return true;
};
