const genRandomInt = require('./genRandInt');

test('genRandomInt should return a random integer between given min + max (inclusive)', () => {
  expect(genRandomInt(0, 10)).toBeLessThanOrEqual(10);
  expect(genRandomInt(10, 50)).toBeGreaterThanOrEqual(10);
  expect(genRandomInt(10, 50)).toBeLessThanOrEqual(50);
});

test('genRandomInt should return a random integer between 0 and 20 (inclusive) when no values given for min or max', () => {
  expect(genRandomInt()).toBeLessThanOrEqual(20);
  expect(genRandomInt()).toBeGreaterThanOrEqual(0);
});
