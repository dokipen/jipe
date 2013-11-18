var util = require('util');
var StringDecoder = require('string_decoder').StringDecoder;
var Transform = require('stream').Transform;
util.inherits(JSONParseStream, Transform);

var debug = require('debug')('jipe.parse'),
    PAIRS = {
      '[': ']',
      '{': '}'
    };

function JSONParseStream(options) {
  if (!(this instanceof JSONParseStream)) {
    return new JSONParseStream(options);
  }

  Transform.call(this, options);
  this._writableState.objectMode = false;
  this._readableState.objectMode = true;
  this._buffer = '';
  this._lastIndex = 0;
  this._decoder = new StringDecoder('utf8');
}

JSONParseStream.prototype._transform = function(chunk, encoding, done) {
  debug('**entering transform**');
  this._buffer += this._decoder.write(chunk);


  debug('--entering search loop--');
  while (this._buffer.length > 1 && this._lastIndex + 1 < this._buffer.length) {
    debug('--entering eat bullshit loop--');
    debug('first char: %s', this._buffer[0]);
    debug('length: %s', this._buffer.length);
    while (this._buffer[0] != '[' && this._buffer[0] != '{' && this._buffer.length > 0) {
      debug('discarding: %s', this._buffer[0]);
      this._buffer = this._buffer.substr(1);
    }
    debug('--done eat bullshit loop--');
    debug('buffer: %s', this._buffer);
    debug('lastIndex: %d', this._lastIndex);
    var delim = PAIRS[this._buffer[0]];
    debug('finding %s', delim);
    var index = this._buffer.indexOf(delim, this._lastIndex + 1);
    debug('index: %d', index);
    if (index > 0) {
      var part = this._buffer.substr(0, index + 1);
      try {
        var obj = JSON.parse(part);
        debug('parsed: %j', obj);
        try {
          this.push(obj);
        } catch(e) {
          debug('failed to push %j', obj);
        }
        try {
          this._buffer = this._buffer.substr(index + 1);
        } catch(e) {
          this._buffer = "";
        }
        this._lastIndex = 0;
        debug('reset lastIndex to 0');
        if (this._buffer.length == 0) {
          break;
        }
      } catch(e) {
        debug('didn\'t parse: %s', part);
        this._lastIndex = index;
      }
    } else {
      this._lastIndex = this._buffer.length - 1;
    }
  }
  debug('**exiting transform**');
  done();
};

module.exports = JSONParseStream;
