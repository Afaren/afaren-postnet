'use strict';


const repl = require('repl');
const core = require('../core/postnet');


function printResult(result) {
  if (result.errMsg !== null)
    console.log('error message: ' + result.errMsg);
  else
    console.log('<--  ' + result.value);
  return;
}

const actions = [
  {
    name: 'init',
    help: 'initial: 1. barcode,  2. zipcode',
    doAction: function (cmd) {
      switch (cmd) {
        case '1':
          return 'barcode';
        case '2':
          return 'zipcode';
        case 'q':
          console.log('---exit---');
          replServer.close();
          process.exit(0);
          return;
        default:
          console.log('无效输入');
          return 'init';
      }
    }
  },
  {
    name: 'barcode',
    help: 'input a barcode to convert, entry \'q\' to return previous',
    doAction: function (cmd) {
      switch (cmd) {
        case 'q':
          return 'init';
        default:
          console.log('result: ');
          printResult(core.barcodeToZipcode(cmd));
          return 'init';
      }
    }
  },
  {
    name: 'zipcode',
    help: 'input a zipcode to convert, entry \'q\' to return previous',
    doAction: function (cmd) {
      switch (cmd) {
        case 'q':
          return 'init';
        default:
          console.log('result: ');
          printResult(core.zipcodeToBarcode(cmd));
          return 'init';
      }
    }
  }
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


