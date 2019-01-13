import {DbUser} from '../../../DB/entities/DbUser';
import Player = RageMP.Player;

mp.events.addCommand("veh", (player: Player, text: string, vehModel: string) => {
    mp.vehicles.new(mp.joaat(vehModel), player.position);
});

