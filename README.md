Very simple to use!

Simply install the package globally `npm install -g botname` then type `botname` in the terminal.

```sh
npm install -g botname
botname
# You could name your printer: CelebratoryBot
```

You can also include the package in your own app. First, `npm install --save botname`, then:

```js
var botname = require('botname');

botname().then(console.log); // Output: CelebratoryBot
```
