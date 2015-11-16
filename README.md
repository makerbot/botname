[![Build status](https://travis-ci.org/makerbot/botname.svg?branch=master)](https://travis-ci.org/makerbot/botname)
[![Dependencies](https://david-dm.org/makerbot/botname.svg)](https://david-dm.org/makerbot/botname)

Very simple to use!

Simply install the package globally `npm install -g botname` then type `botname` in the terminal.

```sh
npm install -g botname
botname
# You could name your printer: CelebratoryBot
botname -n
# CelebratoryBot
```

You can also include the package in your own app. First, `npm install --save botname`, then:

```js
var botname = require('botname');

console.log(botname()); // Output: CelebratoryBot
```
