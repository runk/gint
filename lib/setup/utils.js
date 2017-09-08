'use strict';

const fs = require('fs');
const path = require('path');

const debug = require('debug')('gint:setup');

const findParent = (directory, name) => {
  let dir = directory;
  while (dir !== '/') {
    if (fs.existsSync(path.join(dir, name))) {
      return path.resolve(dir, name);
    }

    dir = path.dirname(dir);
  }

  return null;
};

exports.findHooksDir = (dirname) => {
  const dir = findParent(dirname, '.git');

  if (dir) {
    // const gitDir = path.join(dir, '.git');
    // const stats = fs.lstatSync(gitDir);

    // if (stats.isFile()) {
    //   // Expect following format
    //   // git: pathToGit
    //   // On Windows pathToGit can contain ':' (example "gitdir: C:/Some/Path")
    //   const gitFileData = fs.readFileSync(gitDir, 'utf-8');
    //   gitDir = gitFileData.split(':').slice(1).join(':').trim();
    // }
    return path.resolve(dir, 'hooks');
  }

  return null;
};


exports.isSetupRequired = (gintDir) => {
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
