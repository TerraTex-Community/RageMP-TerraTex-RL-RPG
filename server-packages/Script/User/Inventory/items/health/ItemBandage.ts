import {IInventoryItem, ItemCategory, ItemShopTypes} from "../../IInventoryItem";
import Player = RageMP.Player;

export class ItemBandage implements IInventoryItem {
    category: ItemCategory.health;
    itemName: string = "Bandage";
    itemSymbol: string = "bandage";
    // @fixme: for only trying it is only allowed to have 5 after feature finish it should be ~15
    maxAmount: number = 5;

    async use(player: Player, options: { [p: string]: string }): Promise<boolean> {
        player.health += 20;
        return true;
    }

    price = 5.00;
    shopTypes = [ItemShopTypes.shop247];

}

// tslint:disable-next-line:variable-name
export const ItemBandageSymbol = new ItemBandage();
