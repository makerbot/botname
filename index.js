const adjectives = require('./node_modules/adjective-adjective-animal/lists/adjectives')
  , titleCase  = require('title-case')
  , random     = require('random-item')
  ;

module.exports = function botname() {
  const name = titleCase(random(adjectives)).replace(/[^a-z]/ig, '');
  return `${name}Bot`;
};
