# grunt-charset

> Convert text encoding and replace charset code.

[![npm Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]

## Overview
This is a Grunt plugin for converting charset of multiple file types.
grunt-charset operates 2 things.

* Convert text encoding using [iconv-lite](https://github.com/ashtuchkin/iconv-lite).
* Replace code of charset setting. (e.g. `<meta charset="UTF-8">` to `<meta charset="Shift_JIS">`)

## Getting started
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting started](http://gruntjs.com/getting-started) guide.  
Install this plugin with this command:

```sh
$ npm install grunt-charset --save-dev
```

Once the plugin has been installed, it may be enabled inside your "Gruntfile.js" with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-charset');
```

## The "charset" task
In your project's Gruntfile, add a section named `charset` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  charset: {
    dist: {
      options: {
        from: 'UTF-8',
        to: 'Shift_JIS',
        fileTypes: {
          // Code replacement config (Optional)
        }
      },
      files: [{
        expand: true,
        cwd: 'src',
        dest: 'dist',
        src: ['**/*.{html,css}']
      }]
    }
  }
});
```

### Options

#### from
Type: 'String'  
Default: `UTF-8`

Encoding of source charset.
See [supported encodings in iconv-lite](https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings).

#### to
Type: 'String'  
Default: `Shift_JIS`

Encoding of output charset. This also depends on iconv-lite.

#### fileTypes
Type: 'Object'  
Default: (See below)

Configuration of charset code replacement.

```js
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
```

### Examples

#### Target file extensions
Add target extensions of code replacement.
This setting replaces `<meta charset="">` in ".shtml" files as well as ".html".

```js
options: {
  fileTypes: {
    html5: {
      ext: ['.html', '.shtml']
    }
  }
}
```

#### Custom file types
You can add custom replacement config.
In this case, `<?xml ...?>` code blocks in ".xml" files will be replaced.

```js
options: {
  fileTypes: {
    xml: {
      ext: ['.xml'],
      detect: /<\?xml version="1.0" encoding=".*?"\?>/,
      replace: '<?xml version="1.0" encoding="{{charset}}"?>'
    }
  }
}
```

## License
Copyright (c) 2014-2017 Rakuten, Inc.
Licensed under the [MIT License](LICENSE).

[npm-image]: https://img.shields.io/npm/v/grunt-charset.svg
[npm-url]: https://www.npmjs.org/package/grunt-charset
[travis-image]: https://travis-ci.org/rakuten-frontend/grunt-charset.svg?branch=master
[travis-url]: https://travis-ci.org/rakuten-frontend/grunt-charset
[deps-image]: https://david-dm.org/rakuten-frontend/grunt-charset.svg
[deps-url]: https://david-dm.org/rakuten-frontend/grunt-charset
