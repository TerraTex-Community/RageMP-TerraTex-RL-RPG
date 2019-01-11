import {getSpawnPosition} from './Spawn';

mp.events.add(RageEnums.EventKey.PLAYER_DEATH, (player: PlayerMp, reason: HashOrString, killer: PlayerMp) => {
    setTimeout(player.spawn, 10000, getSpawnPosition(player));
});
