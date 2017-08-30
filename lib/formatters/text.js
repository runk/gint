'use strict';

const colors = require('colors/safe');

const pluralize = (word, size) => `${size} ${(size === 0 || size > 1 ? `${word}s` : word)}`;

module.exports = function TextFormatter() {
  return {
    lines: [],
    line: function(level, ruleName, err) {
      this.lines.push({ level, ruleName, err });
    },
    result: function() {
      let warnings = 0;
      let errors = 0;

      const output = this.lines.map(({ level, ruleName, err }) => {
        if (level === 'error') { errors++; }
        if (level === 'warning') { warnings++; }

        const colorLevel = level === 'error' ? colors.red('error') : colors.yellow('warning');
        return `  [${colorLevel}]\t${colors.grey(ruleName)}\t${err.message}`;
      });

      const problems = warnings + errors;
      if (problems > 0) {
        output.unshift('Gint found some issues:');
        output.push('');
        output.push(colors.red.bold(
          ` ✖ ${pluralize('problem', problems)} (${pluralize('error', errors)}, ${pluralize('warning', warnings)})`
        ));
        output.push('');
      }

      return output.join('\n');
    },
  };
};
