import {registerPlayer} from './Register';
import {playerConnect} from './UserConnect';
import {loginPlayer} from './Login';

mp.events.add("execute_login_register", (player: PlayerMp, data: any) => registerPlayer(player, data).catch(console.error));
mp.events.add("execute_login_login", (player: PlayerMp, password: string) => loginPlayer(player, password).catch(console.error));
mp.events.add(RageEnums.EventKey.PLAYER_READY, (player: PlayerMp) => playerConnect(player).catch(console.error));
