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

exports.charset = {

  setUp: function (done) {
    // setup here if necessary
    done();
  },

  defaultOptions: function (test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/Shift_JIS.txt');
    var expected = grunt.file.read('test/expected/Shift_JIS.txt');
    test.equal(actual, expected, 'should describe what the default behavior is.');
    test.done();
  },

  eucjp: function (test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/EUC-JP.txt');
    var expected = grunt.file.read('test/expected/EUC-JP.txt');
    test.equal(actual, expected, 'should describe what the EUC-JP conversion behavior is.');
    test.done();
  },

  html5: function (test) {
    test.expect(2);
    var actual = grunt.file.read('tmp/UTF-8/html5.html');
    var expected = grunt.file.read('test/expected/UTF-8/html5.html');
    var minActual = grunt.file.read('tmp/UTF-8/html5.min.html');
    var minExpected = grunt.file.read('test/expected/UTF-8/html5.min.html');
    test.equal(actual, expected, 'should describe what the html5 with custom options behavior is.');
    test.equal(minActual, minExpected, 'should describe what the minified html5 with custom options behavior is.');
    test.done();
  },

  html4: function (test) {
    test.expect(2);
    var actual = grunt.file.read('tmp/UTF-8/html4.html');
    var expected = grunt.file.read('test/expected/UTF-8/html4.html');
    var minActual = grunt.file.read('tmp/UTF-8/html4.min.html');
    var minExpected = grunt.file.read('test/expected/UTF-8/html4.min.html');
    test.equal(actual, expected, 'should describe what the html4 with custom options behavior is.');
    test.equal(minActual, minExpected, 'should describe what the minified html4 with custom options behavior is.');
    test.done();
  },

  customExtension: function (test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/UTF-8/html4.shtml');
    var expected = grunt.file.read('test/expected/UTF-8/html4.shtml');
    test.equal(actual, expected, 'should describe what the custom extension setting behavior is.');
    test.done();
  },

  css: function (test) {
    test.expect(2);
    var actual = grunt.file.read('tmp/UTF-8/style.css');
    var expected = grunt.file.read('test/expected/UTF-8/style.css');
    var minActual = grunt.file.read('tmp/UTF-8/style.min.css');
    var minExpected = grunt.file.read('test/expected/UTF-8/style.min.css');
    test.equal(actual, expected, 'should describe what the css with custom options behavior is.');
    test.equal(minActual, minExpected, 'should describe what the minified css with custom options behavior is.');
    test.done();
  },

  customFileType: function (test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/UTF-8/data.xml');
    var expected = grunt.file.read('test/expected/UTF-8/data.xml');
    test.equal(actual, expected, 'should describe what the custom file type behavior is.');
    test.done();
  }

};
