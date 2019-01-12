import {getSpawnPosition} from './Spawn';
import Player = RageMP.Player;
import HashOrString = RageMP.HashOrString;

mp.events.add(RageMP.Enums.Event.PLAYER_DEATH, (player: Player, reason: HashOrString, killer: Player) => {
    setTimeout(player.spawn, 10000, getSpawnPosition(player));
});
