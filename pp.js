var util = require('util');
var StringDecoder = require('string_decoder').StringDecoder;
var Transform = require('stream').Transform;
util.inherits(JSONPrintStream, Transform);

var debug = require('debug')('jipe.pp');
var _ = require('underscore');

function JSONPrintStream(options) {
  if (!(this instanceof JSONPrintStream)) {
    return new JSONPrintStream(options);
  }

  var conf = _.extend({
    indent: 4
  }, options);

  Transform.call(this, options);
  this._writableState.objectMode = true;
  this._readableState.objectMode = false;
  this._indent = conf.indent;
}

JSONPrintStream.prototype._transform = function(obj, _, done) {
  debug('printing %j', obj);
  this.push(JSON.stringify(obj, null, this._indent) + '\n');
  done();
};

module.exports = JSONPrintStream;
