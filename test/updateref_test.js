'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.updateref = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  css: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/dist/unformated.html');
    var expected = grunt.file.read('test/expected/unformated.html');
    test.equal(actual, expected, 'should update the external css file references in the src file .');

    test.done();
  },
  js: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/dist/formated.html');
    var expected = grunt.file.read('test/expected/formated.html');
    test.equal(actual, expected, 'should update the external js file references in the src file .');

    test.done();
  },
};
