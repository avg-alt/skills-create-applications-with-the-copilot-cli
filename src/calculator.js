#!/usr/bin/env node
// calculator.js
// Supported operations:
// - addition
// - subtraction
// - multiplication
// - division

function printUsage() {
  console.log(`Usage: node src/calculator.js <operation> <a> <b>\n\nOperations:\n  add       Add a and b\n  subtract  Subtract b from a\n  multiply  Multiply a and b\n  divide    Divide a by b\n\nExamples:\n  node src/calculator.js add 2 3      # outputs 5\n  node src/calculator.js subtract 5 2 # outputs 3\n  node src/calculator.js multiply 4 3 # outputs 12\n  node src/calculator.js divide 6 2   # outputs 3\n`);
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
  if (!op || aRaw === undefined || bRaw === undefined) {
    console.error('Error: missing operation or operands.');
    printUsage();
    process.exitCode = 1;
    return;
  }

  const a = parseNumber(aRaw);
  const b = parseNumber(bRaw);

  if (a === null || b === null) {
    console.error('Error: both operands must be valid numbers.');
    process.exitCode = 1;
    return;
  }

  let result;
  switch (op.toLowerCase()) {
    case 'add':
      // addition
      result = a + b;
      break;
    case 'subtract':
      // subtraction
      result = a - b;
      break;
    case 'multiply':
      // multiplication
      result = a * b;
      break;
    case 'divide':
      // division
      if (b === 0) {
        console.error('Error: division by zero is not allowed.');
        process.exitCode = 1;
        return;
      }
      result = a / b;
      break;
    default:
      console.error(`Error: unknown operation '${op}'.`);
      printUsage();
      process.exitCode = 1;
      return;
  }

  // Print result
  console.log(result);
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = { main, parseNumber };
