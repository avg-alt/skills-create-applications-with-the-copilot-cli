const { spawnSync } = require('child_process');
const path = 'src/calculator.js';

function runCmd(args) {
  return spawnSync('node', [path, ...args], { encoding: 'utf8' });
}

test('add 2 3 -> 5', () => {
  const r = runCmd(['add', '2', '3']);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('5');
});

test('subtract 10 4 -> 6', () => {
  const r = runCmd(['subtract', '10', '4']);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('6');
});

test('multiply 45 2 -> 90', () => {
  const r = runCmd(['multiply', '45', '2']);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('90');
});

test('divide 20 5 -> 4', () => {
  const r = runCmd(['divide', '20', '5']);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('4');
});

test('division by zero returns error and non-zero exit', () => {
  const r = runCmd(['divide', '5', '0']);
  expect(r.status).not.toBe(0);
  expect(r.stderr).toMatch(/division by zero/i);
});

test('invalid operands return error', () => {
  const r = runCmd(['add', 'x', '2']);
  expect(r.status).not.toBe(0);
  expect(r.stderr).toMatch(/operands must be valid numbers/i);
});

