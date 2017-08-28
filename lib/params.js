const fs = require('fs');
const path = require('path');

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');


module.exports = (opts) => {
  if (opts.hookName === 'commit-msg') {
    return readFile(path.join(opts.cwd, opts.hookParamsRaw));
  }
  return opts.hookParams;
};
