exports.hookName = 'commit-msg';

exports.check = (rule, opts) => new Promise((resolve, reject) => {
  const [ sensitivity, min ] = rule;
  const message = String(opts.hookParams).trim();
  if (message.length >= min) {
    resolve();
  } else {
    reject(new Error(`Commit message is too short, min length: ${min} chars`));
  }
});
