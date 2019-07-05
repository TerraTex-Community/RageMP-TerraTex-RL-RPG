import {VehicleCategory} from "./VehicleCategories";
import {AVehicleLicense} from "../Licenses/VehicleLicenses/AVehicleLicense";

export class VehicleListItem {
    price: number;
    displayName: string;
    hash: number;
    buyMode: VEHICLE_BUY_MODE;
    category: VehicleCategory;
    requiredLicenses: AVehicleLicense[];

    constructor(
        price: number,
        modelName: string,
        buyMode: VEHICLE_BUY_MODE,
        category: VehicleCategory,
        requiredLicenses: AVehicleLicense[]
    ) {
        this.price = price;
        this.displayName = modelName;
        this.hash = mp.joaat(modelName);
        this.buyMode = buyMode;
        this.category = category;
        this.requiredLicenses = requiredLicenses;
    }
}

export enum VEHICLE_BUY_MODE {
    NOT_BUYABLE,
    VEHICLE_SHOPS,
    FLIGHT_SHOPS,
    BOAT_SHOPS,
    BLACKMARKET
}
