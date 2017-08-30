'use strict';

exports.hookName = 'commit-msg';

exports.check = (rule, opts) => new Promise((resolve, reject) => {
  const [, max ] = rule;
  const message = String(opts.hookParams).trim();
  if (message.length <= max) {
    resolve();
  } else {
    reject(new Error(`Commit message is too long, max length: ${max} chars`));
  }
});
