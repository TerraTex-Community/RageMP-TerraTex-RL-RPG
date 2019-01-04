import {registerPlayer} from './Register';
import {playerConnect} from './UserConnect';

mp.events.add("execute_login_register", (player: PlayerMp, data: any) => registerPlayer(player, data));
mp.events.add(RageEnums.EventKey.PLAYER_READY, (player: PlayerMp) => playerConnect(player));
