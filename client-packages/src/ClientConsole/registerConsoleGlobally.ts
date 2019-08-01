import {printToConsole} from "./ClientConsoleHandler";

const origConsole = {
    log: console.log,
    info: console.info,
    error: console.error,
    debug: console.debug,
    warn: console.warn
};

export function overwriteGlobalConsole() {
    console.log = message => printLog("log", message);
    console.info = message => printLog("info", message);
    console.error = message => printLog("error", message);
    console.debug = message => printLog("debug", message);
    console.warn = message => printLog("warn", message);
}

function printLog(state, msg) {
    origConsole[state](msg);
    printToConsole(state, msg);
}
