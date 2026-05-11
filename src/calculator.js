#!/usr/bin/env node
// calculator.js
// Supported operations:
// - addition
// - subtraction
// - multiplication
// - division

function printUsage() {
  console.log(`Usage: node src/calculator.js <operation> <a> <b?>\n\nOperations:\n  add         Add a and b\n  subtract    Subtract b from a\n  multiply    Multiply a and b\n  divide      Divide a by b\n  mod, modulo Modulo a by b\n  pow         Exponentiation a^b\n  sqrt        Square root of a (only one operand)\n\nExamples:\n  node src/calculator.js add 2 3        # outputs 5\n  node src/calculator.js subtract 5 2   # outputs 3\n  node src/calculator.js multiply 4 3   # outputs 12\n  node src/calculator.js divide 6 2     # outputs 3\n  node src/calculator.js mod 7 3        # outputs 1\n  node src/calculator.js pow 2 8        # outputs 256\n  node src/calculator.js sqrt 9         # outputs 3\n`);
}

function parseNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function main(argv) {
  if (argv.length === 0 || argv.includes('--help') || argv.includes('-h')) {
    printUsage();
    return;
  }

  const [op, aRaw, bRaw] = argv;
  if (!op) {
    console.error('Error: missing operation.');
    printUsage();
    process.exitCode = 1;
    return;
  }

  const opLower = op.toLowerCase();
  const requiresTwo = opLower !== 'sqrt';

  if (aRaw === undefined || (requiresTwo && bRaw === undefined)) {
    console.error('Error: missing operand(s) for operation.');
    printUsage();
    process.exitCode = 1;
    return;
  }

  const a = parseNumber(aRaw);
  const b = requiresTwo ? parseNumber(bRaw) : null;

  if (a === null || (requiresTwo && b === null)) {
    console.error('Error: operand(s) must be valid numbers.');
    process.exitCode = 1;
    return;
  }

  let result;
  switch (opLower) {
    case 'add':
      result = a + b;
      break;
    case 'subtract':
      result = a - b;
      break;
    case 'multiply':
      result = a * b;
      break;
    case 'divide':
      if (b === 0) {
        console.error('Error: division by zero is not allowed.');
        process.exitCode = 1;
        return;
      }
      result = a / b;
      break;
    case 'mod':
    case 'modulo':
      if (b === 0) {
        console.error('Error: modulo by zero is not allowed.');
        process.exitCode = 1;
        return;
      }
      result = a % b;
      break;
    case 'pow':
    case 'exponent':
    case 'exponentiation':
      result = Math.pow(a, b);
      break;
    case 'sqrt':
    case 'squareroot':
      if (a < 0) {
        console.error('Error: cannot take square root of a negative number.');
        process.exitCode = 1;
        return;
      }
      result = Math.sqrt(a);
      break;
    default:
      console.error(`Error: unknown operation '${op}'.`);
      printUsage();
      process.exitCode = 1;
      return;
  }

  console.log(result);
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = { main, parseNumber };
