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
  expect(r.stderr).toMatch(/operand|valid numbers/i);
});

// New tests for extended operations
test('modulo 5 2 -> 1', () => {
  const r = runCmd(['mod', '5', '2']);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('1');
});

test('modulo alias "modulo" 7 3 -> 1', () => {
  const r = runCmd(['modulo', '7', '3']);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('1');
});

test('modulo by zero returns error', () => {
  const r = runCmd(['mod', '1', '0']);
  expect(r.status).not.toBe(0);
  expect(r.stderr).toMatch(/modulo by zero/i);
});

test('power 2 3 -> 8', () => {
  const r = runCmd(['pow', '2', '3']);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('8');
});

test('power alias exponentiation 3 4 -> 81', () => {
  const r = runCmd(['exponentiation', '3', '4']);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('81');
});

test('power with non-numeric returns error', () => {
  const r = runCmd(['pow', 'foo', '2']);
  expect(r.status).not.toBe(0);
  expect(r.stderr).toMatch(/operand\(s\) must be valid numbers/i);
});

test('square root 16 -> 4', () => {
  const r = runCmd(['sqrt', '16']);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('4');
});

test('square root alias "squareroot" 25 -> 5', () => {
  const r = runCmd(['squareroot', '25']);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('5');
});

test('square root of negative returns error', () => {
  const r = runCmd(['sqrt', '-9']);
  expect(r.status).not.toBe(0);
  expect(r.stderr).toMatch(/square root/i);
});

