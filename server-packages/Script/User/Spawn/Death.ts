import {spawnPlayer} from './Spawn';
import Player = RageMP.Player;
import HashOrString = RageMP.HashOrString;
import {logger} from "../../../Lib/Services/logging/logger";

mp.events.add(RageMP.Enums.Event.PLAYER_DEATH, (player: Player, reason: HashOrString, killer: Player) => {
    setTimeout(spawnThePlayer, 10000, player);
});

function spawnThePlayer(player: Player): void {
    spawnPlayer(player).catch(error => logger.error(error.message, {error}));
}
