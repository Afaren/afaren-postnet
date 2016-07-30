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


class Router {
  constructor(){
    this.currentState = 'init';
    // this.actions = actions;
  }
  handle(cmd) {
    let action = actions.find(v => v.name === this.currentState);
    let nextState = action.doAction(cmd);
    let newAction = actions.find(v => v.name === nextState);
    this.currentState = newAction.name;
  }

  start() {
    console.log(actions.find(v => v.name === this.currentState).help);
  }

}




module.exports = Router;