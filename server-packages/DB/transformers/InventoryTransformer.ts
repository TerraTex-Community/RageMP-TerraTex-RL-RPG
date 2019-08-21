import {ValueTransformer} from "typeorm/decorator/options/ValueTransformer";
import {Inventory} from "../../Script/User/Inventory/Inventory";

export class InventoryTransformer implements ValueTransformer {
    from(value: any): Inventory {
        return new Inventory();
    }

    to(value: Inventory): any {
        return JSON.stringify(value.getItemList());
    }
}
