'use strict';
const _ = require('lodash');

const { isSemverMessage } = require('../utils');

describe('utils', () => {
  describe('isSemverMessage()', () => {
    it('should match semver', () => {
      _.each([
        'v1.2.3\n',
        'v123.0.123456789\n',
        'v0.0.1-123\n',
        'v1.2.3-alpha\n',
      ], (commit) => expect(isSemverMessage(commit)).toBe(true));

      _.each([
        'v1.2.3a\n',
        ' v123.0.123456789\n',
        'v0.0.1-\n',
        'v1.2.\n',
      ], (commit) => expect(isSemverMessage(commit)).toBe(false));
    });
  });
});
