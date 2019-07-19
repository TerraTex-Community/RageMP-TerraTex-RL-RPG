import readline from "readline";
import {Chat} from "../../Script/System/Chat/Chat";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function parseInput(s: string): void {
    if (s.startsWith("/")) {
        // @todo parse cmd
    } else {
        Chat.sendChatNotificationToPlayer(mp.players.toArray(), s, "Servernachricht");
    }
}

rl.on('line', (s) => {
    parseInput(s);
});
