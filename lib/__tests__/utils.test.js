'use strict';
const _ = require('lodash');

const { isSemverMessage } = require('../utils');

describe('utils', () => {
  describe('isSemverMessage()', () => {
    it('should match semver', () => {
      _.each([
        'v1.2.3',
        'v123.0.123456789',
        'v0.0.1-123',
        'v1.2.3-alpha\n',
      ], (commit) => expect(isSemverMessage(commit)).toBe(true));

      _.each([
        'v1.2.3a',
        ' v123.0.123456789',
        'v0.0.1-',
        'v1.2.',
      ], (commit) => expect(isSemverMessage(commit)).toBe(false));
    });
  });
});
