var util = require('util');
var StringDecoder = require('string_decoder').StringDecoder;
var Transform = require('stream').Transform;
util.inherits(InquiryStream, Transform);

var $q = require('inquiry');
var debug = require('debug')('jipe.inquiry');
var _u = require('underscore');

function InquiryStream(options) {
  if (!(this instanceof InquiryStream)) {
    return new InquiryStream(options);
  }
  debug('using inquiry: %s', options.query);

  Transform.call(this, options);
  this._writableState.objectMode = true;
  this._readableState.objectMode = true;
  this._query = $q(options.query);
}

InquiryStream.prototype._transform = function(input, _, done) {
  debug('input: %j', input);
  var output = _u.first(this._query(input));
  debug('output: %j', output);
  if (output) {
    this.push(output);
  }
  done();
};

module.exports = InquiryStream;
