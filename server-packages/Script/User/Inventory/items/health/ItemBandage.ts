import {IInventoryItem, ItemCategory} from "../../IInventoryItem";
import Player = RageMP.Player;

export class ItemBandage implements IInventoryItem {
    category: ItemCategory.health;
    itemName: string = "Bandage";
    itemSymbol: string = "bandage";
    maxAmount: number = 100;

    async use(player: Player, options: { [p: string]: string }): Promise<boolean> {
        player.health += 20;
        return true;
    }

}

export const itemBandage = new ItemBandage();
