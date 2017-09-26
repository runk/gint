'use strict';

const rule = require('../commit-min-len');

describe('lib/rules/commit-min-len', () => {
  const ruleConfig = ['error', 10];

  it('should bind to correct hook name', () => expect(rule.hookName).toBe('commit-msg'));

  it('should work for very basic case', () =>
    expect(rule.check(ruleConfig, { hookParams: 'Project import' })).resolves.toBeUndefined()
  );

  it('should return an error for short commit msg', () =>
    expect(rule.check(ruleConfig, { hookParams: 'fix' })).rejects.toMatchObject({
      message: 'Commit message is too short, min length: 10 chars',
    })
  );

  it('should return an error for short commit msg with huge comment', () =>
    expect(rule.check(ruleConfig, {
      hookParams: [
        'Fix',
        '',
        '# Please enter the commit message for your changes. Lines starting',
        '# with \'#\' will be ignored, and an empty message aborts the commit.',
        '# On branch ignore-comments',
        '# Changes to be committed:',
        '#       modified:   lib/rules/__tests__/commit-max-len.test.js',
        '#',
      ].join('\n'),
    })).rejects.toMatchObject({
      message: 'Commit message is too short, min length: 10 chars',
    })
  );
});
