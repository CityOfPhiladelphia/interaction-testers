var childProcess = require('child_process');
require('dotenv').config();

// load and set environment variables
var CASPERJS_BIN = process.env.CASPERJS_BIN;
process.env.CAPTURE = 'true';

// get test name
var testName = process.argv[2];
if (!testName) {
  throw new Error('Must specify script name');
}

// util for converting buffer objects to utf-8 and writing to console
function writeBuffer(data) {
  console.log(data.toString('utf8'));
}

var child = childProcess.spawn(
  CASPERJS_BIN,
  ['test', 'tests/' + testName + '.js', '--ignore-ssl-errors=true'],
  { env: process.env }
);

child.stdout.on('data', writeBuffer);
child.stderr.on('data', writeBuffer);
