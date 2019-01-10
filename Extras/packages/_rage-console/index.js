/****************************************************************************
*
* PROJECT: 	     rage-console
* DESCRIPTION:   Console for RAGE Multiplayer
* AUTHOR:        Kasimir
* VERSION:       0.3.0
*
****************************************************************************/

const terminal = new (require('./terminal/TerminalManager'))();
//@todo: build own version as client not working

const origConsoleObj = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
};

global.console.log = function() {
  origConsoleObj.log.apply(null, arguments);
  terminal.winston.info.apply(terminal, terminal._formatArgs(arguments))
};

global.console.info = function(){
  origConsoleObj.info.apply(null, arguments);
  terminal.winston.info.apply(terminal, terminal._formatArgs(arguments));
};

global.console.warn = function(){
  origConsoleObj.warn.apply(null, arguments);
  terminal.winston.warn.apply(terminal, terminal._formatArgs(arguments));
};

global.console.error = function(){
  origConsoleObj.error.apply(null, arguments);
  terminal.winston.error.apply(terminal, terminal._formatArgs(arguments));
};
