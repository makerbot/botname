var aaa        = require('adjective-adjective-animal');
var pascalCase = require('pascal-case');
var Promise    = require('bluebird');

function botname() {
  return new Promise(function(resolve, reject) {
    aaa({
      adjectives: 1,
      format: 'sentence'
    }).then(function(string) {
      string = string.split(' ');
      string.pop();
      string.push('bot');
      string = string.join(' ');
      resolve(pascalCase(string));
    });
  });
}

module.exports = botname;
