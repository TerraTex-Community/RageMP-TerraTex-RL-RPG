import Player = RageMP.Player;
import {DbUser} from "../../../DB/entities/DbUser";
import {isPlayerLoggedIn} from "./Login";

export function syncPlayerData(player: Player): void {
    const playerData: DbUser = player.customData.dbUser;

    player.setVariable("inventory.money", playerData.inventory.money);
    player.setVariable("inventory.bank", playerData.inventory.bank);

    player.setVariable("id", playerData.id);
    player.setVariable("charName", `${playerData.forename} ${playerData.lastname}`);

    player.setVariable("data.playtime", playerData.data.playTime);

    player.setVariable("ping", player.ping);
}

setInterval(() => {
    for (const player of mp.players.toArray()) {
        player.setVariable("ping", player.ping);

        if (!isPlayerLoggedIn(player)) {
            continue;
        }
        player.setVariable("data.playtime", player.customData.dbUser.data.playTime);
    }
}, 1000);
