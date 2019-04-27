export interface IWeaponListJson {
    melee: IMelee;
    handguns: IHandguns;
    smg: ISmg;
    shotguns: IShotguns;
    assault_rifles: IAssault_rifles;
    machine_guns: IMachine_guns;
    sniper_rifles: ISniper_rifles;
    heavy_weapons: IHeavy_weapons;
    throwables: IThrowables;
    misc: IMisc;
}
interface IMelee {
    dagger: string;
    bat: string;
    bottle: string;
    crowbar: string;
    unarmed: string;
    flashlight: string;
    golfclub: string;
    hammer: string;
    hatchet: string;
    knuckle: string;
    knife: string;
    machete: string;
    switchblade: string;
    nightstick: string;
    wrench: string;
    battleaxe: string;
    poolcue: string;
    stone_hatchet: string;
}
interface IHandguns {
    pistol: string;
    pistol_mk2: string;
    combatpistol: string;
    appistol: string;
    stungun: string;
    pistol50: string;
    snspistol: string;
    snspistol_mk2: string;
    heavypistol: string;
    vintagepistol: string;
    flaregun: string;
    marksmanpistol: string;
    revolver: string;
    revolver_mk2: string;
    doubleaction: string;
    raypistol: string;
}
interface ISmg {
    microsmg: string;
    smg: string;
    smg_mk2: string;
    assaultsmg: string;
    combatpdw: string;
    machinepistol: string;
    minismg: string;
    raycarbine: string;
}
interface IShotguns {
    pumpshotgun: string;
    pumpshotgun_mk2: string;
    sawnoffshotgun: string;
    assaultshotgun: string;
    bullpupshotgun: string;
    musket: string;
    heavyshotgun: string;
    dbshotgun: string;
    autoshotgun: string;
}
interface IAssault_rifles {
    assaultrifle: string;
    assaultrifle_mk2: string;
    carbinerifle: string;
    carbinerifle_mk2: string;
    advancedrifle: string;
    specialcarbine: string;
    specialcarbine_mk2: string;
    bullpuprifle: string;
    bullpuprifle_mk2: string;
    compactrifle: string;
}
interface IMachine_guns {
    mg: string;
    combatmg: string;
    combatmg_mk2: string;
    gusenberg: string;
}
interface ISniper_rifles {
    sniperrifle: string;
    heavysniper: string;
    heavysniper_mk2: string;
    marksmanrifle: string;
    marksmanrifle_mk2: string;
}
interface IHeavy_weapons {
    rpg: string;
    grenadelauncher: string;
    grenadelauncher_smoke: string;
    minigun: string;
    firework: string;
    railgun: string;
    hominglauncher: string;
    compactlauncher: string;
    rayminigun: string;
}
interface IThrowables {
    grenade: string;
    bzgas: string;
    smokegrenade: string;
    flare: string;
    molotov: string;
    stickybomb: string;
    proxmine: string;
    snowball: string;
    pipebomb: string;
    ball: string;
}
interface IMisc {
    petrolcan: string;
    fireextinguisher: string;
    parachute: string;
}

