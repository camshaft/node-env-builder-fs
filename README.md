env-builder-fs
==============

Filesystem adapter for env-builder

Usage
-----

```js
var builder = require('env-builder');
var fs = require('env-builder-fs');

var env = 'prod';
var types = ['ui', 'api'];
var app = 'my-app';
var path = '/path/to/my/config';

var conf = fs(path);

builder(env, types, app, conf, function(err, ENV) {

});
```
