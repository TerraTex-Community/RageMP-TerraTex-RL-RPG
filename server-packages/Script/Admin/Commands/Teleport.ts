import Player = RageMP.Player;
import {isAdmin} from '../AdminHelper';
import {getPlayerFromNameOrId} from '../../Helper/PlayerHelper';

mp.events.addCommand("goto", ((player: Player, fullText: string, nameOrId: string) => {
    if (isAdmin(player, 1)) {
        const toPlayer: Player | false = getPlayerFromNameOrId(nameOrId);
        if (!toPlayer) {
            player.notify("~r~Player existiert nicht / konnte nicht gefunden werden!");
            return;
        }

        player.position = toPlayer.position;
        player.dimension = toPlayer.dimension;
    }
}));


mp.events.addCommand("gethere", ((player: Player, fullText: string, nameOrId: string) => {
    if (isAdmin(player, 1, true)) {
        const toPlayer: Player | false = getPlayerFromNameOrId(nameOrId);
        if (!toPlayer) {
            player.notify("~r~Player existiert nicht / konnte nicht gefunden werden!");
            return;
        }

        toPlayer.position = player.position;
        toPlayer.dimension = player.dimension;
    }
}));
