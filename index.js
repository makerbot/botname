var adjectives = require('./node_modules/adjective-adjective-animal/lists/adjectives')
  , titleCase  = require('title-case')
  , random     = require('random-item')
  ;

module.exports = function botname() {
  return titleCase(random(adjectives)) + 'Bot';
};
