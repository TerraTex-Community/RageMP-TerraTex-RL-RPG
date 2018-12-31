import {DbUser} from '../../../DB/entities/DbUser';
import {DbAdminBans} from '../../../DB/entities/DbAdminBans';

/**
 * Player starts to connect => check ban table
 */
async function checkBans(player: PlayerMp): Promise<boolean> {
    console.log(`Checks Bans of ${player.name}!`);

    // @ts-ignore
    const serial = player["serial"];
    const name = player.name;

    const user = await DbUser.findAndCount({
        where: {
            nickname: name
        },
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
mp.events.add(RageEnums.EventKey.PLAYER_READY, async (player: PlayerMp) => {
    if (!await checkBans(player)) { return; }

    const playerName = player.name;

    console.log(`${player.name} connected!`);

    const user = await DbUser.findAndCount({
        where: {
            nickname: playerName
        }
    });

    if (user[1] === 0) {
        // @todo: start register
    } else {
        // @todo: start login
    }
});
