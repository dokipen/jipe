var _ = require('underscore');
var debug = require('debug')('jipe.index');

exports.parse = require('./parse');
exports.inquiry = require('./inquiry');
exports.pp = require('./pp');

exports.command = function(options) {
  var conf = _.extend({
    indent: 4,
    query: undefined
  }, options);

  var parts = [process.stdin, exports.parse()];
  if (conf.query) {
    parts.push(exports.inquiry({query: conf.query}));
  }
  parts.push(exports.pp({indent: conf.indent}));
  parts.push(process.stdout);

  parts.reduce(function(pipe, part) {
    return pipe.pipe(part);
  });
};
