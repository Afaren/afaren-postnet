'use strict';
const router = require('./router');
const InitAction = require('./actions/InitAction');
const BarcodeAction = require('./actions/BarcodeAction');
const ZipcodeAction = require('./actions/ZipcodeAction');
const repl = require('repl');

router.start();
repl.start({prompt: '->', eval: handleCmd});

function handleCmd(cmd, context, filename, callback) {
  router.handle(cmd.trim());
  router.start();
  callback();
}



