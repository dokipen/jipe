var Parser = require('../parse');

describe('JSON parser', function() {
  it('should parse JSON streams', function(done) {
    var parse = Parser();
    var objs = [];
    parse.on('data', function(obj) {
      objs.push(obj);
    });
    parse.on('end', function() {
      objs.should.have.lengthOf(2);
      objs[0].should.eql({"blah": "blah"});
      objs[1].should.eql({"fslah": "fsl"});
      done();
    });
    parse.write('{"blah":');
    parse.write('"blah"}{"fsl');
    parse.end('ah": "fsl"}');
  });
  it('should ignore bullshit', function(done) {
    var parse = Parser();
    var objs = [];
    parse.on('data', function(obj) {
      objs.push(obj);
    });
    parse.on('end', function() {
      objs.should.have.lengthOf(2);
      objs[0].should.eql({"blah": "blah"});
      objs[1].should.eql({"fslah": "fsl"});
      done();
    });
    parse.write('\n\n\tlaksdf{"blah":');
    parse.write('"blah"}alskdfjlk{"fsl');
    parse.end('ah": "fsl"}\n\nlasdkf');
  });
  it('should ignore bullshit in large chunks with multiple objs',
      function(done) {
    var parse = Parser();
    var objs = [];
    parse.on('data', function(obj) {
      objs.push(obj);
    });
    parse.on('end', function() {
      objs.should.have.lengthOf(2);
      objs[0].should.eql({"blah": "blah"});
      objs[1].should.eql({"fslah": "fsl"});
      done();
    });
    parse.end('\n\n\tlaksdf{"blah":"blah"}alskdfjlk{"fslah": "fsl"}\n\nlasdkf');
  });
});
