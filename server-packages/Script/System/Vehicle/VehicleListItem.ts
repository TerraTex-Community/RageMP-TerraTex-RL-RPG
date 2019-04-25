import {VehicleCategory} from "./VehicleCategories";
import {AVehicleLicense} from "../Licenses/VehicleLicenses/AVehicleLicense";

export class VehicleListItem {
    price: number;
    displayName: string;
    modelName: string;
    buyableMode: number;
    category: VehicleCategory;
    requiredLicenses: AVehicleLicense[];

    constructor(
        price: number,
        displayName: string,
        modelName: string,
        buyableMode: number,
        category: VehicleCategory,
        requiredLicenses: AVehicleLicense[]
    ) {
        this.price = price;
        this.displayName = displayName;
        this.modelName = modelName;
        this.buyableMode = buyableMode;
        this.category = category;
        this.requiredLicenses = requiredLicenses;
    }
}
