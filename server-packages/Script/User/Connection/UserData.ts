import Player = RageMP.Player;
import {DbUser} from '../../../DB/entities/DbUser';

export function syncPlayerData(player: Player) {
    const playerData: DbUser = player.customData.dbUser;

    player.setVariable("inventory.money", playerData.inventory.money);
    player.setVariable("inventory.bank", playerData.inventory.bank);
}
