'use strict';

const { sanitizeCommitMessage } = require('../utils');

exports.hookName = 'commit-msg';

exports.check = (rule, opts) => new Promise((resolve, reject) => {
  const [, min ] = rule;
  const message = sanitizeCommitMessage(opts.hookParams);
  if (message.length >= min) {
    resolve();
  } else {
    reject(new Error(`Commit message is too short, min length: ${min} chars`));
  }
});
