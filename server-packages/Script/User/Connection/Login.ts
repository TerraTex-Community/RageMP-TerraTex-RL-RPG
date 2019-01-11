import * as crypto from 'crypto';
import {DbUser} from '../../../DB/entities/DbUser';
import {ClientHelper} from '../../Helper/ClientHelper';

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

    console.log(user[0][0]);
    // @todo: implement Login and stuff after
}
