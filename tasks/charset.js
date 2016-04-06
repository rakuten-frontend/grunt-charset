'use strict';

var path = require('path');
var fs = require('fs');
var iconv = require('iconv-lite');
var _ = require('lodash');
var chalk = require('chalk');

module.exports = function (grunt) {
  grunt.registerMultiTask('charset', 'Convert text encoding and replace charset code', function () {
    // Merge task-specific and/or target-specific options with these defaults.
    var defaults = {
      from: 'UTF-8',
      to: 'Shift_JIS',
      fileTypes: {
        html5: {
          ext: ['.html'],
          detect: /<meta\s+charset=["']?.+?["']?\s*\/?>/i,
          replace: '<meta charset="{{charset}}">'
        },
        html4: {
          ext: ['.html'],
          detect: /<meta\s+http-equiv=["']?Content-Type["']?\scontent=["']?.*?charset=.+?["']?\s*\/?>/i,
          replace: '<meta http-equiv="Content-Type" content="text/html; charset={{charset}}">'
        },
        css: {
          ext: ['.css'],
          detect: /^@charset\s+(".+?"|'.+?')/,
          replace: '@charset "{{charset}}"'
        }
      }
    };
    var options = this.options(defaults);

    // Merge fileTypes child object.
    _.forOwn(defaults.fileTypes, function (type, typeName) {
      options.fileTypes[typeName] = _.merge({}, type, options.fileTypes[typeName]);
    });

    // Iterate over all specified file groups.
    this.files.forEach(function (filePair) {
      filePair.src.forEach(function (filepath) {
        var extension = path.extname(filepath);
        var readBuffer = fs.readFileSync(filepath);
        var src = iconv.decode(readBuffer, options.from);
        var writeBuffer;

        // Replace charset code.
        _.forOwn(options.fileTypes, function (type) {
          var detect;
          var replace;
          if (_.indexOf(type.ext, extension) !== -1) {
            detect = type.detect;
            replace = type.replace.replace('{{charset}}', options.to);
            src = src.replace(detect, replace);
          }
        });

        // Convert encoding.
        writeBuffer = iconv.encode(src, options.to);

        // Write the destination file.
        grunt.file.write(filePair.dest, writeBuffer);

        // Print a success message.
        grunt.log.writeln('File ' + chalk.cyan(filePair.dest + ' (' + options.to + ')') + ' created.');
      });
    });
  });
};
