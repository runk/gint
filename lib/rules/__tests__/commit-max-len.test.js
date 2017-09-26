'use strict';

const rule = require('../commit-max-len');

describe('lib/rules/commit-max-len', () => {
  const ruleConfig = ['error', 32];

  it('should bind to correct hook name', () => expect(rule.hookName).toBe('commit-msg'));

  it('should work for very basic case', () =>
    expect(rule.check(ruleConfig, { hookParams: 'Project import' })).resolves.toBeUndefined()
  );

  it('should return an error for extra long commit msg', () =>
    expect(rule.check(ruleConfig, { hookParams: Array(256).join('x') })).rejects.toMatchObject({
      message: 'Commit message is too long, max length: 32 chars',
    })
  );

  it('should not return an error for huge comments', () =>
    expect(rule.check(ruleConfig, {
      hookParams: [
        'Fix this and that',
        '',
        '# Please enter the commit message for your changes. Lines starting',
        '# with \'#\' will be ignored, and an empty message aborts the commit.',
        '# On branch ignore-comments',
        '# Changes to be committed:',
        '#       modified:   lib/rules/__tests__/commit-max-len.test.js',
        '#',
      ].join('\n'),
    })).resolves.toBeUndefined()
  );
});
