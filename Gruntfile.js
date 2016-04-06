'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // ESLint
    eslint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'test/*.js'
      ]
    },

    // Clean up
    clean: {
      tests: ['tmp']
    },

    // "charset" task for tests
    charset: {
      defaultOptions: {
        files: {
          'tmp/Shift_JIS.txt': ['test/fixtures/UTF-8.txt']
        }
      },
      eucjp: {
        options: {
          to: 'EUC-JP'
        },
        files: {
          'tmp/EUC-JP.txt': ['test/fixtures/UTF-8.txt']
        }
      },
      customOptions: {
        options: {
          from: 'Shift_JIS',
          to: 'UTF-8',
          fileTypes: {
            html4: {
              ext: ['.html', '.shtml']
            },
            xml: {
              ext: ['.xml'],
              detect: /<\?xml version="1.0" encoding=".*?"\?>/,
              replace: '<?xml version="1.0" encoding="{{charset}}"?>'
            }
          }
        },
        files: [{
          expand: true,
          cwd: 'test/fixtures/Shift_JIS',
          dest: 'tmp/UTF-8',
          src: [
            '*'
          ]
        }]
      }
    },

    // Unit tests
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['eslint', 'clean', 'charset', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);
};
