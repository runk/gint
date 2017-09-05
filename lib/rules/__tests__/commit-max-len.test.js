const rule = require('../commit-max-len');

describe('lib/rules/commit-max-len', () => {
  const ruleConfig = ['error', 32];

  it('should bind to correct hook name', () => expect(rule.hookName).toBe('commit-msg'));

  it('should work for very basic case', () =>
    expect(rule.check(ruleConfig, { hookParams: 'Project import'})).resolves.toBeUndefined()
  );

  it('should return an error for extra long commit msg', () =>
    expect(rule.check(ruleConfig, { hookParams: Array(256).join('x')})).rejects.toMatchObject({
      message: 'Commit message is too long, max length: 32 chars',
    })
  );
});
