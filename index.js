/**
 * Module dependencies
 */

var join = require('path').join;
var read = require('fs').readFile;

/**
 * Read from a source
 *
 * @param {String} source
 * @return {Function}
 */

module.exports = function(source) {
  return function() {
    return function(key) {
      return dirHandle(source, key, key === 'default');
    };
  };
};

function dirHandle(source, dir, stop) {
  var path = join(source, dir);
  return function() {
    return function(key) {
      if (stop) return readEnv(join(path, key));
      return dirHandle(path, key, true);
    };
  };
}

function readEnv(path) {
  return function(fn) {
    read(path, 'utf8', function(err, contents) {
      if (err && err.code === 'ENOENT') return fn(null, {});
      if (err) return fn(err);
      fn(null, parse(contents));
    });
  };
}

function parse(contents) {
  if (!contents) return {};
  return contents.split('\n').reduce(function(ENV, line) {
    var parts = line.split('=');
    ENV[parts[0]] = parts[1];
    return ENV;
  }, {});
}
