import {getSpawnPosition} from './Spawn';
import Player = RageMP.Player;
import HashOrString = RageMP.HashOrString;
import {EventHelper} from '../../Helper/EventHelper';

mp.events.add(RageMP.Enums.Event.PLAYER_DEATH, (player: Player, reason: HashOrString, killer: Player) => {
    const position = getSpawnPosition(player);

    setTimeout(() => {
        player.spawn(position);
    }, 10000);

});
