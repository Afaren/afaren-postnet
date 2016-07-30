/**
 * Created by afaren on 7/30/16.
 */


const InitAction = require('./actions/InitAction');
const BarcodeAction = require('./actions/BarcodeAction');
const ZipcodeAction = require('./actions/ZipcodeAction');

const actions = [
  new InitAction(),
  new BarcodeAction(),
  new ZipcodeAction()
];

let currentState = 'init';

const router = {
  handle(cmd) {
    let router = actions.find(v => v.name === currentState);
    let nextState = router.doAction(cmd);
    let newRouter = actions.find(v => v.name === nextState);
    currentState = newRouter.name;
  },

  start() {
    console.log(actions.find(v => v.name === currentState).help);
  }
};


module.exports = router;