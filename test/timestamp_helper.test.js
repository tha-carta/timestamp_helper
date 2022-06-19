const fns = require('../src/timestamp_helper');

test('Extracts numbers from input', () => {
  expect(fns.extractNumerics('no numbers')).toStrictEqual([]);
  expect(fns.extractNumerics('  100  ')).toStrictEqual(['100']);
  expect(fns.extractNumerics('  100. 100.2  ')).toStrictEqual(['100', '100.2']);
  expect(fns.extractNumerics('  other1655315747.461text  ')).toStrictEqual(['1655315747.461']);
  expect(fns.extractNumerics('// 1655315747461\n// 1655315747461000000')).toStrictEqual(['1655315747461', '1655315747461000000']);
});

test('Classifies decimal numerics', () => {
  expect(fns.isDecimalTimestamp('1655315747.461')).toBe(true);
  expect(fns.isDecimalTimestamp('1655315747461')).toBe(false);
});

test('Converts to ms', () => {
  expect(fns.toMillis('1655315747.461')).toStrictEqual({ "ms": 1655315747461, "desc": "DECIMAL SECONDS" });
  expect(fns.toMillis('1655315747')).toStrictEqual({ "ms": 1655315747000, "desc": "INTEGER SECONDS" });
  expect(fns.toMillis('1655315747461123456')).toStrictEqual({ "ms": 1655315747461.123456, "desc": "INTEGER NANOSECONDS" });
  expect(fns.toMillis('1655315747461')).toStrictEqual({ "ms": 1655315747461, "desc": "INTEGER MILLISECONDS" });
  expect(fns.toMillis('100')).toStrictEqual({ "ms": 100, "desc": "INTEGER MILLISECONDS" });
});

test('Converts multiple timestamps', () => {
  let two_outputs = fns.convertAllTimestamps('// 1655315747461\n// 1655315747461000000')
  expect((two_outputs.match(/Found/g) || []).length).toBe(2);
});

// Test Cases
// 100
// 100.
// 100.0
// 1655315747.461
// 1655315747
// 1655315747461
// 1655315747461000000
