#!/usr/bin/env node

var botname = require('../');
var colors = require('colors');

botname().then(function(name) {
  console.log('You could name your printer: ' + name.red);
});
