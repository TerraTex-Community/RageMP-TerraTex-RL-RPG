import {IIventoryItem} from "./Items/IIventoryItem";
import globby from "globby";

export const inventoryItemDefinitions: {[itemClassName: string]: IIventoryItem} = {};

export async function initInventorySystem(): Promise<void> {
    // @ts-ignore
    const paths = await globby(`packages/TerraTex/Script/System/Inventory/Items/**/Item*`);
    for (const item of paths) {
        const itemClass = require(`./${item.replace(/packages.TerraTex.Script.System.Inventory./, "")}`);
        inventoryItemDefinitions[itemClass.default.name] = new itemClass.default();
    }
}
