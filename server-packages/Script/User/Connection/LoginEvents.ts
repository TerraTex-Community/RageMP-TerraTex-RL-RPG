import {registerPlayer} from './Register';
import {playerConnect} from './UserConnect';
import {loginPlayer} from './Login';
import {EventHelper} from '../../Helper/EventHelper';
import {checkCodeAndSetPassword, getHiddenEMail, sendEmailCode} from './PasswordForgotten';

mp.events.add('execute_login_password_forgotten_getEmailHidden',
    (player: PlayerMp) => EventHelper.resolveEventAsync(getHiddenEMail, player));

mp.events.add('login_passwordForgotten_setNewPassword',
    (player: PlayerMp, pw: string, code: string) => EventHelper.resolveEventAsync(checkCodeAndSetPassword, player, pw, code));

mp.events.add('login_passwordForgotten_sendCode',
    (player: PlayerMp) => EventHelper.resolveEventAsync(sendEmailCode, player));

mp.events.add('execute_login_register',
    (player: PlayerMp, data: any) => EventHelper.resolveEventAsync(registerPlayer, player, data));

mp.events.add('execute_login_login',
    (player: PlayerMp, password: string) => EventHelper.resolveEventAsync(loginPlayer, player, password));

mp.events.add(RageEnums.EventKey.PLAYER_READY,
    (player: PlayerMp) => playerConnect(player).catch(console.error));
