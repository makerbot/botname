#!/usr/bin/env node

var botname = require('../');
var colors = require('colors');

var name = botname();
var str = (process.argv[2] == '-n')
  ? ''
  : 'You could name your printer: '
  ;
console.log(str + name.red);
