import {DbUser} from '../../../DB/entities/DbUser';
import Player = RageMP.Player;

mp.events.addCommand("veh", (player: Player, text: string, vehModel: string) => {
    mp.vehicles.new(mp.joaat(vehModel), player.position);
});

mp.events.addCommand("money", (player: Player, text: string, amount: string) => {
    const amountP = parseInt(amount);
    const playerData: DbUser = player.customData.dbUser;
    playerData.inventory.money += amountP;
});

