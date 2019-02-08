import Player = RageMP.Player;
import {DbUser} from '../../../DB/entities/DbUser';

export function syncPlayerData(player: Player) {
    const playerData: DbUser = player.customData.dbUser;

    player.setVariable("inventory.money", playerData.inventory.money);
    player.setVariable("inventory.bank", playerData.inventory.bank);

    player.setVariable("id", playerData.id);
    player.setVariable("charName", playerData.forename + " " + playerData.lastname);

    player.setVariable("data.playtime", playerData.data.playTime);

    player.setVariable("ping", player.ping);
}

setInterval(() => {
    mp.players.forEach((player: Player) => {
       player.setVariable("ping", player.ping);
    });
}, 1000);
