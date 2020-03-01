const origConsole = {
    log: console.log,
    info: console.info,
    error: console.error,
    debug: console.debug,
    warn: console.warn
};

export function overwriteGlobalConsole(): void {
    console.log = message => {
        printLog("log", message);
        mp.console.logInfo(message, true, true);
    };
    console.info = message => {
        printLog("info", message);
        mp.console.logInfo(message, true, true);
    };
    console.error = message => {
        printLog("error", message);
        mp.console.logError(message, true, true);
    };
    console.debug = message => {
        printLog("debug", message);
        mp.console.logInfo(message, true, true);
    };
    console.warn = message => {
        printLog("warn", message);
        mp.console.logWarning(message, true, true);
    }
}

function printLog(state: string, msg: any): void {
    origConsole[state](msg);
}

