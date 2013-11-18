var Inquiry = require('../inquiry');

describe('JSON Inquirer', function() {
  var o0 = {
    "name": "o0",
    "children": [{"name": "o0i0"}, {"name": "o0i1"}],
    "type": "even"
  };
  var o1 = {"name": "o1", "fslah": "fsl", "type": "odd"};
  var o2 = {"name": "o2", "fslah": "fsl", "type": "even"};
  var o3 = {"name": "o3", "fslah": "fsl", "type": "odd"};

  it('should inquire', function(done) {
    var inquiry = Inquiry({query: '{$.type == "even"}/name'});
    var objs = [];

    inquiry.on('data', function(obj) {
      objs.push(obj);
    });

    inquiry.on('end', function() {
      objs.should.have.lengthOf(2);
      objs[0].should.be.type('string');
      objs[0].should.eql("o0");
      objs[1].should.be.type('string');
      objs[1].should.eql("o2");
      done();
    });
    inquiry.write(o0);
    inquiry.write(o1);
    inquiry.write(o2);
    inquiry.end(o3);
  });

  it('should inquire arrays', function(done) {
    var inquiry = Inquiry({query: '{$.type == "even"}/c*/n*'});
    var objs = [];

    inquiry.on('data', function(obj) {
      objs.push(obj);
    });

    inquiry.on('end', function() {
      objs.should.have.lengthOf(1);
      objs[0].should.eql([ "o0i0", "o0i1" ]);
      done();
    });
    inquiry.write(o0);
    inquiry.write(o1);
    inquiry.write(o2);
    inquiry.end(o3);
  });
});
