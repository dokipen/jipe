var util = require('util');
var Transform = require('stream').Transform;
util.inherits(JSONPathStream, Transform);

var jevel = require('JSONPath').eval;
var debug = require('debug')('jipe.jsonpath');
var _ = require('underscore');

// reverse parameters
function $q(query, obj) { return jevel(obj, query); }

function JSONPathStream(options) {
  if (!(this instanceof JSONPathStream)) {
    return new JSONPathStream(options);
  }
  debug('using JSONPath: %s', options.query);

  Transform.call(this, options);
  this._writableState.objectMode = true;
  this._readableState.objectMode = true;
  this._query = _.partial($q, options.query);
}

JSONPathStream.prototype._transform = function(input, _, done) {
  debug('input: %j', input);
  var output = this._query(input);
  if (output.length == 1) {
    debug('output: %j', output[0]);
    this.push(output[0]);
  } else if (output.length > 1) {
    debug('output: %j', output);
    this.push(output);
  }
  done();
};

module.exports = JSONPathStream;
