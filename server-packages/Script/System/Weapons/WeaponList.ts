import {WEAPON_BUY_MODE, WeaponListItem} from "./WeaponListItem";
import {WeaponCategory} from "./WeaponCategogries";
import {LIGHT_WEAPON_LICENSE} from "../Licenses/WeaponLicenses/LightLicense";
import {MID_HEAVY_WEAPON_LICENSE} from "../Licenses/WeaponLicenses/MidHeavyLicense";
import {HEAVY_WEAPON_LICENSE} from "../Licenses/WeaponLicenses/HeavyLicense";
import {WAR_WEAPON_LICENSE} from "../Licenses/WeaponLicenses/WarLicense";

export function getWeaponListItemByHash(hash: number): WeaponListItem | false {
    for (const item of WEAPON_LIST) {
        if (item.hash === hash) {
            return item;
        }
    }
    return false;
}

export function getWeaponListItemByModelId(name: string): WeaponListItem | false {
    for (const item of WEAPON_LIST) {
        if (item.modelId === name) {
            return item;
        }
    }
    return false;
}

export const WEAPON_LIST: WeaponListItem[] = [
    //melee
    new WeaponListItem(-1, "weapon_dagger", "Antique Cavalry Dagger", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Melee, []),
    new WeaponListItem(-1, "weapon_bat", "Baseball Bat", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Melee, []),
    new WeaponListItem(-1, "weapon_bottle", "Broken Bottle", WEAPON_BUY_MODE.NOT_BUYABLE, WeaponCategory.Melee, []),
    new WeaponListItem(-1, "weapon_crowbar", "Crowbar", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Melee, []),
    new WeaponListItem(-1, "weapon_flashlight", "Flashlight", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Others, []),
    new WeaponListItem(-1, "weapon_golfclub", "Golf Club", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Melee, []),
    new WeaponListItem(-1, "weapon_hammer", "Hammer", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Melee, []),
    new WeaponListItem(-1, "weapon_hatchet", "Hatchet", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Melee, []),
    new WeaponListItem(-1, "weapon_knuckle", "Brass Knuckles", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Melee, []),
    new WeaponListItem(-1, "weapon_knife", "Knife", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Melee, []),
    new WeaponListItem(-1, "weapon_machete", "Machete", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Melee, []),
    new WeaponListItem(-1, "weapon_switchblade", "Switchblade", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Melee, []),
    new WeaponListItem(-1, "weapon_nightstick", "Nightstick", WEAPON_BUY_MODE.NOT_BUYABLE, WeaponCategory.Melee, []),
    new WeaponListItem(-1, "weapon_wrench", "Pipe Wrench", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Melee, []),
    new WeaponListItem(-1, "weapon_battleaxe", "Battle Axe", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Melee, []),
    new WeaponListItem(-1, "weapon_poolcue", "Pool Cue", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Melee, []),
    new WeaponListItem(-1, "weapon_stone_hatchet", "Stone Hatchet", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Melee, []),

    //Handguns
    new WeaponListItem(-1, "weapon_pistol", "Pistol", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Handguns, [LIGHT_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_pistol_mk2", "Pistol Mk II", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Handguns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_combatpistol", "Combat Pistol", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Handguns, [LIGHT_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_appistol", "AP Pistol", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Handguns, [LIGHT_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_stungun", "Stun Gun", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Handguns, []),
    new WeaponListItem(-1, "weapon_pistol50", "Pistol .50", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Handguns, [LIGHT_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_snspistol", "SNS Pistol", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Handguns, [LIGHT_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_snspistol_mk2", "SNS Pistol Mk II", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Handguns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_heavypistol", "Heavy Pistol", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Handguns, [LIGHT_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_vintagepistol", "Vintage Pistol", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Handguns, [LIGHT_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_flaregun", "Flare Gun", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Handguns, []),
    new WeaponListItem(-1, "weapon_marksmanpistol", "Marksman Pistol", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Handguns, [LIGHT_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_revolver", "Heavy Revolver", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Handguns, [LIGHT_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_revolver_mk2", "Heavy Revolver Mk II", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Handguns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_doubleaction", "Double Action Revolver", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Handguns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_raypistol", "Up-n-Atomizer", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Handguns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),

    // SMGs
    new WeaponListItem(-1, "weapon_microsmg", "Micro SMG", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.SubmachineGuns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_smg", "SMG", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.SubmachineGuns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_smg_mk2", "SMG Mk II", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.SubmachineGuns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_assaultsmg", "Assault SMG", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.SubmachineGuns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_combatpdw", "Combat PDW", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.SubmachineGuns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_machinepistol", "Machine Pistol", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.SubmachineGuns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_minismg", "Mini SMG", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.SubmachineGuns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_raycarbine", "Unholy Hellbringer", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.SubmachineGuns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),

    //Shotguns
    new WeaponListItem(-1, "weapon_pumpshotgun", "Pump Shotgun", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Shutguns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_pumpshotgun_mk2", "Pump Shotgun Mk II", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Shutguns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_sawnoffshotgun", "Sawed-Off Shotgun", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Shutguns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_assaultshotgun", "Assault Shotgun", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Shutguns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_bullpupshotgun", "Bullpup Shotgun", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Shutguns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_musket", "Musket", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Shutguns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_heavyshotgun", "Heavy Shotgun", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Shutguns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_dbshotgun", "Double Barrel Shotgun", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Shutguns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_autoshotgun", "Sweeper Shotgun", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Shutguns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),

    //Assault Rifles
    new WeaponListItem(-1, "weapon_assaultrifle", "Assault Rifle", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.AssaultRifles,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_assaultrifle_mk2", "Assault Rifle Mk II", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.AssaultRifles,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_carbinerifle", "Carbine Rifle", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.AssaultRifles,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_carbinerifle_mk2", "Carbine Rifle Mk II", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.AssaultRifles,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_advancedrifle", "Advanced Rifle", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.AssaultRifles,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_specialcarbine", "Special Carbine", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.AssaultRifles,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_specialcarbine_mk", "Special Carbine Mk II", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.AssaultRifles,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_bullpuprifle", "Bullpup Rifle", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.AssaultRifles,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_bullpuprifle_mk2", "Bullpup Rifle Mk II", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.AssaultRifles,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_compactrifle", "Compact Rifle", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.AssaultRifles,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE]),

    // LMGS
    new WeaponListItem(-1, "weapon_mg", "MG", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.LightMachineGuns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_combatmg", "Combat MG", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.LightMachineGuns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_combatmg_mk2", "Combat MG Mk II", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.LightMachineGuns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_gusenberg", "Gusenberg Sweeper", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.LightMachineGuns,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE]),

    //Sniper Rifles
    new WeaponListItem(-1, "weapon_sniperrifle", "Sniper Rifle", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.SniperRifles,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_heavysniper", "Heavy Sniper", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.SniperRifles,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_heavysniper_mk2", "Heavy Sniper Mk II", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.SniperRifles,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_marksmanrifle", "Marksman Rifle", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.SniperRifles,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_marksmanrifle_mk2", "Marksman Rifle Mk II", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.SniperRifles,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),

    //Heavy Weapons
    new WeaponListItem(-1, "weapon_rpg", "RPG", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.HeavyWeapons,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_grenadelauncher", "Grenade Launcher", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.HeavyWeapons,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_grenadelauncher_smoke", "Grenade Launcher Smoke", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.HeavyWeapons,
        []),
    new WeaponListItem(-1, "weapon_minigun", "Minigun", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.HeavyWeapons,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_firework", "Firework Launcher", WEAPON_BUY_MODE.NOT_BUYABLE, WeaponCategory.HeavyWeapons, []),
    new WeaponListItem(-1, "weapon_railgun", "Railgun", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.HeavyWeapons,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_hominglauncher", "Homing Launcher", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.HeavyWeapons,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_compactlauncher", "Compact Grenade Launcher", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.HeavyWeapons,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_rayminigun", "Widowmaker", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.HeavyWeapons,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),

    // Thowables
    new WeaponListItem(-1, "weapon_grenade", "Grenade", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.Throwables,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_bzgas", "BZ Gas", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.Throwables,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_molotov", "Molotov Cocktail", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.Throwables,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_stickybomb", "Sticky Bomb", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.Throwables,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_proxmine", "Proximity Mines", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.Throwables,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_snowball", "Snowballs", WEAPON_BUY_MODE.NOT_BUYABLE, WeaponCategory.Throwables, []),
    new WeaponListItem(-1, "weapon_pipebomb", "Pipe Bombs", WEAPON_BUY_MODE.BLACKMARKET, WeaponCategory.Throwables,
        [LIGHT_WEAPON_LICENSE, MID_HEAVY_WEAPON_LICENSE, HEAVY_WEAPON_LICENSE, WAR_WEAPON_LICENSE]),
    new WeaponListItem(-1, "weapon_ball", "Baseball", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Throwables, []),
    new WeaponListItem(-1, "weapon_smokegrenade", "Tear Gas", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Throwables, []),
    new WeaponListItem(-1, "weapon_flare", "Flare", WEAPON_BUY_MODE.WEAPON_SHOP, WeaponCategory.Throwables, []),

    //others
    new WeaponListItem(-1, "weapon_petrolcan", "Jerry Can", WEAPON_BUY_MODE.NOT_BUYABLE, WeaponCategory.Others, []),
    new WeaponListItem(-1, "gadget_parachute", "Parachute", WEAPON_BUY_MODE.NOT_BUYABLE, WeaponCategory.Others, []),
    new WeaponListItem(-1, "weapon_fireextinguisher", "Fire Extinguisher", WEAPON_BUY_MODE.NOT_BUYABLE, WeaponCategory.Others, []),


];
