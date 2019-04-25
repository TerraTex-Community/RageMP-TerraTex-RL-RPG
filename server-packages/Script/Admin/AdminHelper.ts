import Player = RageMP.Player;
import {DbUser} from "../../DB/entities/DbUser";
import {isPlayerLoggedIn} from "../User/Connection/Login";


/**
 *
 * @param player
 * @param minAdminLvl -
 *                  1: Supporter
 *                  2: Moderator
 *                  3: Administator
 *                  4: Serverleitung
 * @param checkOnDevServer
 */
export function isAdmin(player: Player, minAdminLvl: number = 1, checkOnDevServer: boolean = false): boolean {
    if (isDevServer() && !checkOnDevServer) {
        return true;
    }
    return (<DbUser>player.customData.dbUser).admin >= minAdminLvl;
}

export function isDevServer(): boolean {
    return !!mp.config.isDevServer;

}

export function getAdminRankDescription(adminlvl: number): string {
    const ranks = [
        "",
        "Supporter",
        "Moderator",
        "Administrator",
        "Serverleitung"
    ];

    return ranks[adminlvl];
}

export function getAllOnlineAdmins(): Player[] {
    const list: Player[] = [];
    for (const player of mp.players.toArray()) {
        if (isPlayerLoggedIn(player) && isAdmin(player, 1, true)) {
            list.push(player);
        }
    }

    return list;
}
