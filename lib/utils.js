'use strict';

exports.sanitizeCommitMessage = (message) => {
  return message
    .split('\n')
    .filter((line) => line.indexOf('#') !== 0)
    .join('\n')
    .trim();
};

exports.isSemverMessage = RegExp().test.bind(/^\d+\.\d+.\d+(-.+)?\n$/);

exports.isSemver = (opts) => {
  return opts.hookName === 'commit-msg' && exports.isSemverMessage(opts.hookParams);
};
