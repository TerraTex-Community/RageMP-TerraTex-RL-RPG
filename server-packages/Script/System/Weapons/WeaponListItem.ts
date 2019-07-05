import {WeaponCategory} from "./WeaponCategogries";
import {AWeaponLicense} from "../Licenses/WeaponLicenses/AWeaponLicense";

export class WeaponListItem {
    price: number;
    modelId: string;
    displayName: string;
    hash: number;
    buyMode: WEAPON_BUY_MODE;
    category: WeaponCategory;
    requiredLicenses: AWeaponLicense[];

    constructor(
        price: number,
        modelId: string,
        displayName: string,
        buyMode: WEAPON_BUY_MODE,
        category: WeaponCategory,
        requiredLicenses: AWeaponLicense[]
    ) {
        this.price = price;
        this.modelId = modelId;
        this.displayName = displayName;
        this.hash = mp.joaat(modelId);
        this.buyMode = buyMode;
        this.category = category;
        this.requiredLicenses = requiredLicenses;
    }
}

export enum WEAPON_BUY_MODE {
    NOT_BUYABLE,
    WEAPON_SHOP,
    BLACKMARKET
}
