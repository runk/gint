'use strict';

exports.hookName = 'commit-msg';

exports.check = (rule, opts) => new Promise((resolve, reject) => {
  const [, pattern, regexpOptions] = rule;
  const regexp = new RegExp(pattern, regexpOptions);
  if (regexp.test(opts.hookParams)) {
    resolve();
    return;
  }

  reject(new Error(`Commit message does not match pattern "${pattern}"`));
});
