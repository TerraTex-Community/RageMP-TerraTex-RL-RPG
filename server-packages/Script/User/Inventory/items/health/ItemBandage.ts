import {IInventoryItem, ItemCategory} from "../../IInventoryItem";
import Player = RageMP.Player;
import {ItemShopTypes} from "../../ItemShopTypes";

export class ItemBandage implements IInventoryItem {
    category: ItemCategory.health;
    itemName: string = "Bandage";
    itemSymbol: string = "bandage";
    maxAmount: number = 15;

    async use(player: Player, options: { [p: string]: string }): Promise<boolean> {
        player.health += 20;
        return true;
    }

    price = 5.00;
    shopTypes = [ItemShopTypes.shop247];

}

// tslint:disable-next-line:variable-name
export const ItemBandageSymbol = new ItemBandage();
