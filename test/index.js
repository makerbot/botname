var should = require('chai').should();
var botname = require('../');

describe("Let's name a bot!", function() {
  it('botname() should return a printer name', function() {
    return botname().then(function(name) {
      name.should.be.a('string')
        .and.match(/^[A-Z][A-Za-z]*Bot$/);
    });
  });
});