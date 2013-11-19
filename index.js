var _ = require('underscore');
var debug = require('debug')('jipe.index');

exports.parse = require('./parse');
exports.inquiry = require('./inquiry');
exports.jsonpath = require('./jsonpath');
exports.pp = require('./pp');

exports.command = function(options) {
  var conf = _.extend({
    indent: 4,
    query: undefined,
    jsonpath: undefined
  }, options);

  var parts = [process.stdin, exports.parse({skip: conf.skip})];
  if (conf.inquiry) {
    parts.push(exports.inquiry({query: conf.inquiry}));
  }
  if (conf.jsonpath) {
    parts.push(exports.jsonpath({query: conf.jsonpath}));
  }
  parts.push(exports.pp({indent: conf.indent}));
  parts.push(process.stdout);

  parts.reduce(function(pipe, part) {
    return pipe.pipe(part);
  });
};
