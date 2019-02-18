import {spawnPlayer} from './Spawn';
import Player = RageMP.Player;
import HashOrString = RageMP.HashOrString;

mp.events.add(RageMP.Enums.Event.PLAYER_DEATH, (player: Player, reason: HashOrString, killer: Player) => {
    setTimeout(spawnThePlayer, 10000, player);
});

function spawnThePlayer(player: Player): void {
    spawnPlayer(player).catch(e => console.error(e));
}
