var util = require('util');
var StringDecoder = require('string_decoder').StringDecoder;
var Transform = require('stream').Transform;
util.inherits(JSONParseStream, Transform);

var debug = require('debug')('jipe.parse');
var PAIRS = {
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
  this._state = 'DONE'; // PARSING, COLLECTING
  this._decoder = new StringDecoder('utf8');
}

JSONParseStream.prototype._transform = function(chunk, encoding, done) {
  debug('entering transform [%s] %s', this._state, this._buffer);
  var buffer = this._decoder.write(chunk);

  while (buffer.length > 0 || this._state == 'PARSING') {
    debug('state: %s', this._state);
    debug('buffer: %s', buffer);
    debug('parse buffer: %s', this._buffer);
    if (this._state == 'DONE') {
      // eat bullshit between objects (usually whitespace) until [ or {
      var s0 = buffer.indexOf('{');
      var s1 = buffer.indexOf('[');
      var start = 0;
      if (s0 == -1 && s1 == -1) {
        // object doesn't start in this chunk, so just drop it
        return done();
      } else if ([s0, s1].indexOf(-1) >= 0) {
        // only one start symbol was found
        start = Math.max(s0, s1);
      } else {
        // both were found, use the first one
        start = Math.min(s0, s1);
      }
      // get first char in so we know what to look for
      this._buffer = buffer.substr(start, 1);
      buffer = buffer.substr(start + 1);
      this._state = 'COLLECTING';
    } else if (this._state == 'COLLECTING') {
      // collect until matching pair terminator
      var terminator = PAIRS[this._buffer[0]];
      debug('searching for %s', terminator);
      var index = buffer.indexOf(terminator);
      if (index >= 0) {
        this._buffer += buffer.substr(0, index + 1);
        buffer = buffer.substr(index + 1);
        this._state = 'PARSING';
      } else {
        this._buffer += buffer;
        buffer = "";
      }
    } else if (this._state == 'PARSING') {
      try {
        var obj = JSON.parse(this._buffer);
        try {
          this.push(obj);
        } catch(e) {
          debug('failed to push %j', obj);
        }
        this._buffer = '';
        this._state = 'DONE';
      } catch(e) {
        debug('didn\'t parse: %s', this._buffer);
        this._state = 'COLLECTING';
      }

    }
  }
  debug('exiting transform [%s] %s', this._state, this._buffer);
  done();
};

module.exports = JSONParseStream;
