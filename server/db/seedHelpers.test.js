// helpers test
import helpers from './seedHelpers';

describe('synchronous helper(s) test', () => {
  test('genRandomInt should return a random integer between given min + max (inclusive)', () => {
    expect(helpers.genRandomInt(0, 10)).toBeLessThanOrEqual(10);
    expect(helpers.genRandomInt(10, 50)).toBeGreaterThanOrEqual(10);
    expect(helpers.genRandomInt(10, 50)).toBeLessThanOrEqual(50);
  });
});
