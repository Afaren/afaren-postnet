/**
 * Created by afaren on 7/31/16.
 */
const Router = require('./Router');
const repl = require('repl');
const Shell = require('./shell/Shell');

new Shell(new Router(), repl).run();
