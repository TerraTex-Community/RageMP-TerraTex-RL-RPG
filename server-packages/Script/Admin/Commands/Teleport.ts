import Player = RageMP.Player;
import {isAdmin} from "../AdminHelper";
import {getPlayerFromNameOrId} from "../../Helper/PlayerHelper";

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

mp.events.addCommand("gotopos", ((player: Player, fullText: string, position: string) => {
    if (isAdmin(player, 1, true)) {
        const positions = position.split(",");
        player.position = new mp.Vector3(parseFloat(positions[0]), parseFloat(positions[1]), parseFloat(positions[2]));
    }
}));
