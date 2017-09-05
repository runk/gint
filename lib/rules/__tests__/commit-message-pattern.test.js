const rule = require('../commit-message-pattern');

describe('lib/rules/commit-message-pattern', () => {
  const ruleConfig = ['error', "^(feature|bugfix|hotfix)\\:.{5,}", "i"];

  it('should bind to correct hook name', () => expect(rule.hookName).toBe('commit-msg'));

  it('should work for very basic case', () =>
    expect(rule.check(ruleConfig, { hookParams: 'feature: foo bar'})).resolves.toBeUndefined()
  );

  it('should return an error for short commit msg', () =>
    expect(rule.check(ruleConfig, { hookParams: 'foo bar' })).rejects.toMatchObject({
      message: 'Commit message does not match pattern \"^(feature|bugfix|hotfix)\\:.{5,}\"'
    })
  );
});
