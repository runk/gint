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
});
