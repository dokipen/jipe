var util = require('util');
var Transform = require('stream').Transform;
util.inherits(InquiryStream, Transform);

var $q = require('inquiry');
var debug = require('debug')('jipe.inquiry');

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

module.exports = InquiryStream;
