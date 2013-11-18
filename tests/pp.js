var Pp = require('../pp');

describe('JSON pretty printer', function() {
  it('should pretty print JSON', function(done) {
    var pp = Pp();
    var lines = [];

    var o0 = {"blah": "blah"};
    var o1 = {"fslah": "fsl"};

    pp.on('data', function(line) {
      lines.push(line.toString());
    });

    pp.on('end', function() {
      lines.should.have.lengthOf(2);
      lines[0].should.be.type('string');
      lines[0].should.eql(JSON.stringify(o0, null, 4) + "\n");
      lines[1].should.be.type('string');
      lines[1].should.eql(JSON.stringify(o1, null, 4) + "\n");
      done();
    });
    pp.write(o0);
    pp.end(o1);
  });
  it('should compact when indent is 0', function(done) {
    var pp = Pp({indent: 0});
    var lines = [];

    var o0 = {"blah": "blah"};
    var o1 = {"fslah": "fsl"};

    pp.on('data', function(line) {
      lines.push(line.toString());
    });

    pp.on('end', function() {
      lines.should.have.lengthOf(2);
      lines[0].should.be.type('string');
      lines[0].should.eql(JSON.stringify(o0, null, 0) + "\n");
      lines[1].should.be.type('string');
      lines[1].should.eql(JSON.stringify(o1, null, 0) + "\n");
      done();
    });
    pp.write(o0);
    pp.end(o1);
  });
});
