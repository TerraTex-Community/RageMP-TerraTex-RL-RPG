import "./Teleport";
import {DbUser} from "../../../DB/entities/DbUser";
import Player = RageMP.Player;
import {ItemBandageSymbol} from "../../User/Inventory/items/health/ItemBandage";

mp.events.addCommand("additem", (player: Player) => {
    (player.customData.dbUser as DbUser).inventory.addInventoryItem(ItemBandageSymbol);
    player.outputChatBox(`Anzahl Bandagen in Inventory: ${(player.customData.dbUser as DbUser).inventory.getAmountOfInventoryItem(ItemBandageSymbol)}`);
});


mp.events.addCommand("useitem", (player) => {
    const bandages = (player.customData.dbUser as DbUser).inventory.getAItem(ItemBandageSymbol);
    if (bandages) {
        bandages.use(player);
        player.outputChatBox(`Anzahl Bandagen in Inventory: ${(player.customData.dbUser as DbUser).inventory.getAmountOfInventoryItem(ItemBandageSymbol)}`);
        player.outputChatBox(
            `Anzahl Bandagen in Inventory: ${(player.customData.dbUser as DbUser).inventory.getAItem(ItemBandageSymbol) ? 'not removed' : 'removed'}`
        );
    }
});

