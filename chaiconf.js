let chai = require("chai");

// print stack trace on assertion errors
chai.config.includeStack = true;

// register globals
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.expect = chai.expect;
global.assert = chai.assert;

// enable should style
chai.should();