import readline from "readline";
import {Chat} from "../../Script/System/Chat/Chat";
import {logger} from "./logging/logger";

const serverCmds: {[cmd: string]: Function} = {};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function parseInput(s: string): void {
    if (s.startsWith("/")) {
        let parts = s.split(" ");
        const cmd = parts[0].substring(1);

        if (serverCmds[cmd]) {
            parts = parts.slice(1);
            serverCmds[cmd].apply(null, parts);
            logger.info("Sended Serverconsole Command: ", {cmd, args: parts});
        } else {
            console.error(`Cmd "${cmd}" doesn't exist for serverconsole.`);
        }

    } else {
        Chat.sendChatNotificationToPlayer(mp.players.toArray(), s, "Servernachricht");
        logger.info("Sended Serverconsole Message: " + s);
    }
}

rl.on('line', (s) => {
    parseInput(s);
});

export function registerServerCommand(cmd: string, func: Function): void {
    if (serverCmds[cmd]) throw new Error(`Cmd "${cmd}" already exist`);

    serverCmds[cmd] = func;
}
