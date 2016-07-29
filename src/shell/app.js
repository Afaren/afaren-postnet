'use strict';

const InitAction = require('./actions/InitAction');
const BarcodeAction = require('./actions/BarcodeAction');
const ZipcodeAction = require('./actions/ZipcodeAction');
const repl = require('repl');
// const core = require('../core/postnet');

const actions = [
  new InitAction(),
  new BarcodeAction(),
  new ZipcodeAction()
];


function switchRouter(context, done) {
  let router = actions.find(i => i.name === currentState);
  let result = router.doAction(context.cmd);
  let newRouter = actions.find(i => i.name === result);

  currentState = newRouter.name;
  console.log(newRouter.help);
  done(null);
}

function handleCmd(cmd, context, filename, done) {
  switchRouter({cmd: cmd.trim()}, done);
  done(null);
}

let currentState = 'init';
console.log(actions.find(i => i.name === currentState).help);
let replServer = repl.start({prompt: '->', eval: handleCmd});


