vapebot
========

Example bot for [ICHC node.js API wrapper](https://github.com/nderscore/nodeICHC)


Usage
========

Dependant on these node.js packages:
* `superagent`
* `node-persist`
* `feed-read`

A directory `/brains` should be created in the vapebot directory for persistant storage.

A copy of `ICHC.js` should be placed in the vapebot directory

A json file `apiKey.json` should be placed in the vapebot directory with content like this:

`{apiKey:"api key here"}`

`node vapebot.js` to run.