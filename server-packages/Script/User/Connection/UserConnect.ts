import {DbUser} from "../../../DB/entities/DbUser";
import {DbAdminBans} from "../../../DB/entities/DbAdminBans";
import Player = RageMP.Player;
import {ShutdownService} from "../../../Lib/Services/ShutdownService";
import isServerShuttingDown = ShutdownService.isServerShuttingDown;

/**
 * Player starts to connect => check ban table
 */
async function checkBans(player: Player): Promise<boolean> {
    console.log(`Checks Bans of ${player.name}!`);

    // @ts-ignore
    const serial = player.serial;
    const name = player.name;

    const user = await DbUser.findAndCount({
        where: {
            nickname: name
        }
    });

    if (user[1] !== 0) {
        if ((await user[0][0].bans).length > 0) {
            player.outputChatBox("!{#ff0000} You are banned from this server.");
            console.error(`${player.name} is already banned.`);
            player.kick("You are banned from this server.");

            return false;
        }
    }

    const serialBans = await DbAdminBans.findAndCount({
        where: {
            serial: serial
        }
    });

    if (serialBans[1] !== 0) {
        player.outputChatBox("!{#ff0000} You are banned from this server.");
        console.error(`${player.name} is already banned.`);
        player.kick("You are banned from this server.");
        return false;
    }

    return true;
}

/**
 * Player Connected => show Register or Login
 */
export async function playerConnect(player: Player) {
    // hide player
    player.alpha = 0;
    player.position = new mp.Vector3(0,0,200);
    player.dimension = 1;

    if (isServerShuttingDown) {
        player.call("setShutDownView");
        return;
    }

    try {
        const result = await checkBans(player);
        if (!result) {
            return false;
        }
    } catch (e) {
        console.error(e);
    }

    const playerName = player.name;

    console.log(`${player.name} connected!`);

    const user = await DbUser.findAndCount({
        where: {
            nickname: playerName
        }
    });

    player.call("login_startLoginProcess", [user[1] > 0]);

}
