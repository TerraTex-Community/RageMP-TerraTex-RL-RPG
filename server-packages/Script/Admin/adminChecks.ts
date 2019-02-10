import Player = RageMP.Player;
import {DbUser} from '../../DB/entities/DbUser';

export function isAdmin(player: Player, minAdminLvl: number = 1, checkOnDevServer = false): boolean {
    if (isDevServer() && !checkOnDevServer) return true;
    return (<DbUser>player.customData.dbUser).admin >= minAdminLvl;
}

export function isDevServer(): boolean {
    if (mp.config.isDevServer) {
        return true;
    }
    return false;
}
