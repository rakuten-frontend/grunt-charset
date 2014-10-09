# grunt-charset [![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

> Convert text encoding and replace charset code

## Overview
This is a Grunt plugin for converting charset of multiple file types.
grunt-charset operates 2 things.

* Convert text encoding using [iconv-lite](https://github.com/ashtuchkin/iconv-lite).
* Replace code of charset setting. (e.g. `<meta charset="UTF-8">` to `<meta charset="Shift_JIS">`)

## Getting Started
If you are new to Grunt, you will find a lot of answers to your questions in their [getting started guide](http://gruntjs.com/getting-started).  
Install this plugin with this command:

```shell
npm install grunt-charset --save-dev
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
Supported encodings are same as [iconv-lite](https://github.com/ashtuchkin/iconv-lite#supported-encodings) module.

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

### Usage Examples

#### Target File Extensions
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

#### Custom File Types
You can add a new file type using object notation.
In this example, `<?xml ...?>` code in ".xml" files are replaced.

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
Copyright (c) 2014 Rakuten, Inc. Licensed under the [MIT License](http://opensource.org/licenses/MIT).

[npm-image]: https://img.shields.io/npm/v/grunt-charset.svg?style=flat
[npm-url]: https://www.npmjs.org/package/grunt-charset
[travis-image]: https://img.shields.io/travis/rakuten-frontend/grunt-charset/master.svg?style=flat
[travis-url]: https://travis-ci.org/rakuten-frontend/grunt-charset
