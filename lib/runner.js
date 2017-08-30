'use strict';

const _ = require('lodash');
const path = require('path');
const Formatter = require('./formatters/text');

const debug = require('debug')('gint:runner');

const run = (name, rule, opts) => {
  debug('Exec rule "%s"', name);
  const checker = require(path.join(__dirname, 'rules', name));
  if (checker.hookName !== opts.hookName) {
    return Promise.resolve();
  }
  return checker.check(rule, opts);
};


module.exports = (config, opts) => {
  debug('Starting');

  let errored = false;
  const formatter = new Formatter();
  const rules = _.map(config.rules, (rule, name) => ({ name, rule }));

  const end = () => {
    const output = formatter.result();

    const stream = errored ? process.stderr : process.stdout;
    stream.write(output);

    const exitCode = errored ? 1 : 0;
    debug('Exit code: %d', exitCode);
    process.exit(exitCode);
  };

  const iterate = (i) => {
    if (i >= rules.length) {
      end();
    }

    const { rule, name } = rules[i];

    run(name, rule, opts)
      .then(() => iterate(i + 1))
      .catch((err) => {
        const level = rule[0];
        if (level === 'err' || level === 'error') {
          errored = true;
          formatter.line('error', name, err);
        } else if (level === 'warn' || level === 'warning') {
          formatter.line('warning', name, err);
        }
        iterate(i + 1);
      });
  };

  iterate(0);
};
