import {InventoryDef} from "./Inventory";
import Entity = RageMP.Entity;
import {inventoryItemDefinitions} from "./InventorySystem";

export class InventoryManager {
    /**
     * Checks if item exists in inventory and amount is greater 0
     * @param {InventoryDef} inventoryData
     * @param {string} inventoryItemClassName
     */
    static hasInventoryItem(inventoryData: InventoryDef, inventoryItemClassName: string): boolean {
        if (!inventoryItemDefinitions[inventoryItemClassName]) throw new Error(`Item ${inventoryItemClassName} does not exist!`);
        if (inventoryData.hasOwnProperty(inventoryItemClassName) && inventoryData[inventoryItemClassName].amount > 0) {
            return true;
        }
        return false;
    }

    /**
     * Adds an item to inventory
     * @param inventoryData
     * @param inventoryItemClassName
     * @param amount
     */
    static addInventoryItem(inventoryData: InventoryDef, inventoryItemClassName: string, amount: number): void {
        if (!inventoryItemDefinitions[inventoryItemClassName]) throw new Error(`Item ${inventoryItemClassName} does not exist!`);

        if (!inventoryData.hasOwnProperty(inventoryItemClassName)) {
            inventoryData[inventoryItemClassName] = {
                amount: 0
            }
        }

        inventoryData[inventoryItemClassName].amount++;
        console.log(JSON.stringify(inventoryData, null, 4));
    }

    /**
     * Uses Item of Inventory
     * @param inventoryData
     * @param inventoryItemClassName
     * @param player
     */
    static useInventoryItem(inventoryData: InventoryDef, inventoryItemClassName: string, player: Player): boolean {
        if (!inventoryItemDefinitions[inventoryItemClassName]) throw new Error(`Item ${inventoryItemClassName} does not exist!`);
        if (!InventoryManager.hasInventoryItem(inventoryData, inventoryItemClassName)) return false;

        if (inventoryItemDefinitions[inventoryItemClassName].use(player)) {
            inventoryData[inventoryItemClassName].amount--;
            if (inventoryData[inventoryItemClassName].amount === 0) {
                delete inventoryData[inventoryItemClassName];
            }
            return true;
        }
        return false;
    }

    /**
     * @todo implement
     */
    static dropInventoryItem(inventoryData: InventoryDef, inventoryItemClassName: string, entity: Entity): boolean {
        if (!inventoryItemDefinitions[inventoryItemClassName]) throw new Error(`Item ${inventoryItemClassName} does not exist!`);
        throw new Error("Not implemented yet");
        return false;
    }


}

