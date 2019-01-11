import * as crypto from 'crypto';
import {DbUser} from '../../../DB/entities/DbUser';
import {ClientHelper} from '../../Helper/ClientHelper';
import {DbUserData} from '../../../DB/entities/DbUserData';
import {DbUserInventory} from '../../../DB/entities/DbUserInventory';
import {spawnPlayer} from '../Spawn/Spawn';

export async function loginPlayer(player: PlayerMp, password: string) {
    const encryptedPw = crypto.createHash('sha256').update(password).digest('hex');

    const user = await DbUser.findAndCount({
        where: {
            nickname: player.name,
            password: encryptedPw
        }
    });

    if (user[1] < 1) {
        player.notify('~r~Das Passwort, dass du eingegeben hast, ist nicht korrekt.');

        ClientHelper.callClientSideFunc(
            player,
            'game.audio.playSoundFrontend',
            -1,
            'MP_IDLE_KICK',
            'HUD_FRONTEND_DEFAULT_SOUNDSET',
            true
        );

        player.call('login_startLoginProcess', [true, true]);
        return false;
    }

    const userObj:DbUser = user[0][0];

    // ensure tables
    if (userObj.data === null) {
        await (new DbUserData(userObj)).save();
    }
    if (userObj.inventory === null) {
        await (new DbUserInventory(userObj)).save();
    }

    await userObj.reload();

    player.setVariable("dbUser", userObj);
    player.setVariable("loggedIn", true);

    spawnPlayer(player);
}
