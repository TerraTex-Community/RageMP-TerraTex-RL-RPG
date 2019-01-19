import {getSpawnPosition} from './Spawn';
import Player = RageMP.Player;
import HashOrString = RageMP.HashOrString;
import {EventHelper} from '../../Helper/EventHelper';

mp.events.add(RageMP.Enums.Event.PLAYER_DEATH, (player: Player, reason: HashOrString, killer: Player) => {
    EventHelper.resolveEventAsync((aPlayer: Player) => {
        try {
            setTimeout(aPlayer.spawn, 10000, getSpawnPosition(aPlayer));
        } catch (e) {
            console.error(e);
        }
    }, player);
});
