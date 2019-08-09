import Player = RageMP.Player;
import {logger} from "./logging/logger";
import {DbUser} from "../../DB/entities/DbUser";

mp.events.add("log_client_to_server", function (player: Player, dataString: string): void {
    const data = JSON.parse(dataString);

    const logData = {
        playerName: (player.customData.dbUser as DbUser).nickname,
        playerId: (player.customData.dbUser as DbUser).id,
        clientMessage: data.message,
        clientData: data.data
    };
    logger.log(data.type, `ClientLog of ${player.name}: ${data.message}`, logData);
});


type logTypes = "log" | "debug" | "warn" | "info" | "crit" | "error";

export function sendLogToClient(player: Player, type: logTypes, msg: any): void {
    if (typeof msg !== "string" && typeof msg !== "number") {
        msg = JSON.stringify(msg);
    }

    player.call("log_server_to_client", [type, msg]);
}

export const clientLogger = {
    log: (player: Player, msg: any) => sendLogToClient(player, "log", msg),
    debug: (player: Player, msg: any) => sendLogToClient(player, "debug", msg),
    error: (player: Player, msg: any) => sendLogToClient(player, "error", msg),
    info: (player: Player, msg: any) => sendLogToClient(player, "info", msg),
    warn: (player: Player, msg: any) => sendLogToClient(player, "warn", msg),
    crit: (player: Player, msg: any) => sendLogToClient(player, "crit", msg),
};
