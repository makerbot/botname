const should = require('chai').should()
  , botname = require('../')
  ;

describe("Let's name a bot!", () => {
  it('botname() should return a printer name', () => {
    botname().should.be.a('string')
      .and.match(/^[A-Z][A-Za-z]*Bot$/);
  });
});
