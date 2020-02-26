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
        const cmd = parts[0].substring(1).toLowerCase();

        if (serverCmds[cmd]) {
            parts = parts.slice(1);
            serverCmds[cmd].apply(null, parts);
            logger.info("Sended Serverconsole Command: ", {cmd, args: parts});
        } else {
            console.error(`Cmd "${cmd}" doesn't exist for serverconsole.`);
        }

    } else {
        Chat.sendChatNotificationToPlayer(mp.players.toArray(), s, "Servernachricht");
        logger.info(`Sended Serverconsole Message: ${s}`);
    }
}

rl.on('line', (s) => {
    parseInput(s);
});

/**
 * @param cmd - The command (will be transformed to lowercase)
 * @param func - Function that will be executed (non async awaiter)
 */
export function registerServerCommand(cmd: string, func: Function): void {
    if (serverCmds[cmd.toLowerCase()]) throw new Error(`Cmd "${cmd.toLowerCase()}" already exist`);

    serverCmds[cmd.toLowerCase()] = func;
}

registerServerCommand("help", () => {
    console.info(`Available Commands: ${Object.keys(serverCmds).join(", ")}`);
});
