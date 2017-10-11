'use strict';
const _ = require('lodash');

const { isSemverMessage } = require('../utils');

describe('utils', () => {
  describe('isSemverMessage()', () => {
    it('should match semver', () => {
      _.each([
        '1.2.3\n',
        '123.0.123456789\n',
        '0.0.1-123\n',
        '1.2.3-alpha\n',
      ], (commit) => expect(isSemverMessage(commit)).toBe(true));

      _.each([
        '1.2.3a\n',
        ' 123.0.123456789\n',
        '0.0.1-\n',
        '1.2.\n',
      ], (commit) => expect(isSemverMessage(commit)).toBe(false));
    });
  });
});
