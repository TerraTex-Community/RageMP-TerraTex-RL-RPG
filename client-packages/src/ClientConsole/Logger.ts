import {overwriteGlobalConsole} from "./registerConsoleGlobally";

class Logger {
    log(msg: string, data: object = {}): void {
        this.sendLogToServer("log", msg, data);
    }

    warn(msg: string, data: object = {}): void {
        this.sendLogToServer("warn", msg, data);
    }

    info(msg: string, data: object = {}): void {
        this.sendLogToServer("info", msg, data);
    }

    debug(msg: string, data: object = {}): void {
        this.sendLogToServer("debug", msg, data);
    }

    error(msg: string, data: object = {}): void {
        this.sendLogToServer("error", msg, data);
    }

    crit(msg: string, data: object = {}): void {
        this.sendLogToServer("crit", msg, data);
    }

    constructor() {
        mp.events.add("log_server_to_client", this.receiveConsoleLog);
        overwriteGlobalConsole();
    }

    private receiveConsoleLog(logType: string, dataMsg: string): void {
        switch(logType) {
            case "warn":
                mp.console.logWarning("Server Console Log: " + dataMsg, true, true);
                break;
            case "crit":
                mp.console.logFatal("Server Console Log: " + dataMsg, true, true);
                break;
            case "error":
                mp.console.logError("Server Console Log: " + dataMsg, true, true);
                break;
            case "log":
            case "debug":
            case "info":
            default:
                mp.console.logInfo("Server Console Log: " + dataMsg, true, true);
                break;
        }
    }

    private sendLogToServer(logType: string, msg: string, data: object): void {
        mp.events.callRemote("log_client_to_server", JSON.stringify({
            type: logType,
            message: msg,
            data
        }));
    }
}

export const logger = new Logger();
