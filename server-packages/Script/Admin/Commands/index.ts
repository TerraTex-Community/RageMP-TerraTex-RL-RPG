import "./Teleport";
import {DbUser} from "../../../DB/entities/DbUser";

mp.events.addCommand("additem", (player) => {
    (player.customData.dbUser as DbUser).inventory.addInventoryItem('bandage');

});


mp.events.addCommand("useitem", (player) => {
    const bandages = (player.customData.dbUser as DbUser).inventory.getAItemByItemSymbol('bandage');
    if (bandages) {
        bandages.use(player);
    }

});
