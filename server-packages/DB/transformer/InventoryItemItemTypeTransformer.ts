import {ValueTransformer} from "typeorm/decorator/options/ValueTransformer";
import {getInventoryItemByItemSymbol, IInventoryItem} from "../../Script/User/Inventory/IInventoryItem";

export class InventoryItemItemTypeTransformer implements ValueTransformer {
    from(value: string): IInventoryItem {
        let type = getInventoryItemByItemSymbol(value);
        if (type) return type;
        throw new Error("Item Type '" + value + "' does not exist.");
    }

    to(value: IInventoryItem): any {
        return value.itemSymbol;
    }
}
