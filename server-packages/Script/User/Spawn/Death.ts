import {getSpawnPosition} from './Spawn';
import Player = RageMP.Player;
import HashOrString = RageMP.HashOrString;
import {EventHelper} from '../../Helper/EventHelper';

mp.events.add(RageMP.Enums.Event.PLAYER_DEATH, (player: Player, reason: HashOrString, killer: Player) => {


    setTimeout(spawnThePlayer, 10000, player);

});

function spawnThePlayer(player: Player) {
    console.log("10s later");
    const position = getSpawnPosition(player);
    player.spawn(position);
}
