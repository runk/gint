'use strict';

const _ = require('lodash');
const { isSemver } = require('./utils');
const Formatter = require('./formatters/text');
const path = require('path');

const debug = require('debug')('gint:runner');

const run = (name, rule, opts) => {
  debug('Exec rule "%s"', name);
  const checker = require(path.join(__dirname, 'rules', name));
  if (checker.hookName !== opts.hookName || isSemver(opts)) {
    return Promise.resolve();
  }
  return checker.check(rule, opts);
};


module.exports = (config, opts) => new Promise((resolve, reject) => {
  debug('Starting');

  let errored = false;
  const formatter = new Formatter();
  const rules = _.map(config.rules, (rule, name) => ({ name, rule }));

  _.reduce(rules, (result, { rule, name }) => result
    .then(() => run(name, rule, opts))
    .catch((err) => {
      const level = rule[0];
      if (level === 'err' || level === 'error') {
        errored = true;
        formatter.line('error', name, err);
      } else if (level === 'warn' || level === 'warning') {
        formatter.line('warning', name, err);
      }
    }), Promise.resolve())
    .then(() => {
      const output = formatter.result();
      debug('Finishing', { errored, output });
      errored ? reject(output) : resolve(output);
    });
});
