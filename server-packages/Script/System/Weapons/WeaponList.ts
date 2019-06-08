import {WEAPON_BUY_MODE, WeaponListItem} from "./WeaponListItem";
import {WeaponCategory} from "./WeaponCategogries";

export function getWeaponListItemByHash(hash: number): WeaponListItem|false {
    for (const item of WEAPON_LIST) {
        if (item.hash === hash) return item;
    }
    return false;
}

export function getWeaponListItemByModelId(name: string): WeaponListItem|false {
    for (const item of WEAPON_LIST) {
        if (item.modelId === name) return item;
    }
    return false;
}

export const WEAPON_LIST: WeaponListItem[] = [
    new WeaponListItem(-1, "weapon_dagger", "Antique Cavalry Dagger", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Melee, [])
];
