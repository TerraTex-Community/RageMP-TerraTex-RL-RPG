import "./Teleport";
import {DbUser} from "../../../DB/entities/DbUser";
import Player = RageMP.Player;
import {clientLogger} from "../../../Lib/Services/ClientConsole";

mp.events.addCommand("showinv", (player: Player) => {
    clientLogger.log(player, JSON.stringify((player.customData.dbUser as DbUser).inventory.inventoryItems));
});




