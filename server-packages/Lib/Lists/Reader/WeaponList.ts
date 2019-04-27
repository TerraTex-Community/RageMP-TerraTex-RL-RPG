import data from "./../weapons.json"
import {IWeaponListJson} from "../IWeaponListJson";

export function getAllWeapons(): IWeaponListJson {
    return data;
}


