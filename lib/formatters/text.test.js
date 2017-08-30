const Formatter = require('./text');

describe('lib/formatters/text', () => {
  it('should work for very basic case', () => {
    const formatter = new Formatter();
    formatter.line('error', 'foo', new Error('First'));
    formatter.line('warning', 'bar', new Error('Second'));
    expect(formatter.result()).toMatchSnapshot();
  });

  it('should work for multiply errors/warnings', () => {
    const formatter = new Formatter();
    formatter.line('error', 'foo', new Error('Burito'));
    formatter.line('error', 'foz', new Error('Taco'));
    formatter.line('warning', 'bar', new Error('Nachos'));
    formatter.line('warning', 'baz', new Error('Quesadilla'));
    expect(formatter.result()).toMatchSnapshot();
  });

  it('should work when no errors', () => {
    const formatter = new Formatter();
    expect(formatter.result()).toMatchSnapshot();
  });
});
