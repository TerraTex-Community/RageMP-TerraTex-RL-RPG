import {printToConsole} from "./ClientConsoleHandler";

class Logger {
    log(msg: string, data: object = {}) {
        this.sendLogToServer("log", msg, data);
    }

    warn(msg: string, data: object = {}) {
        this.sendLogToServer("warn", msg, data);
    }

    info(msg: string, data: object = {}) {
        this.sendLogToServer("info", msg, data);
    }

    debug(msg: string, data: object = {}) {
        this.sendLogToServer("debug", msg, data);
    }

    error(msg: string, data: object = {}) {
        this.sendLogToServer("error", msg, data);
    }

    crit(msg: string, data: object = {}) {
        this.sendLogToServer("crit", msg, data);
    }

    constructor() {
        mp.events.add("log_server_to_client", this.receiveConsoleLog);
    }

    private receiveConsoleLog(logType: string, dataMsg: string) {
        printToConsole("info", "received following Log from Server");
        printToConsole(logType, dataMsg);
    }

    private sendLogToServer(logType: string, msg: string, data: object) {
        mp.events.callRemote("log_client_to_server", JSON.stringify({
            type: logType,
            message: msg,
            data
        }));
    }
}

export const logger = new Logger();
