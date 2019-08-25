import Player = RageMP.Player;
import {itemBandage} from "./items/health/ItemBandage";

export const enum ItemCategory {
    health = "Heilung"
}

export interface IInventoryItem {
    itemName: string;
    itemSymbol: string;
    maxAmount: number;
    category: ItemCategory

    use(player: Player, options?: {[optionsName: string]: string}): Promise<boolean>;
}

// @info: add new item types here
const items: IInventoryItem[] = [itemBandage];
export function getInventoryItemByItemSymbol(symbol: string): IInventoryItem | undefined {
    for (const itemType of items) {
        if (itemType.itemSymbol === symbol) return itemType;
    }
    return undefined;
}
